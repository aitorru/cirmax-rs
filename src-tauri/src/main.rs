#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use bcrypt::verify;
use cirmax::*;
use diesel::prelude::*;
use lazy_static::lazy_static; // 1.4.0
use log::{debug, error, info, trace, warn, LevelFilter};
use log4rs::{
    append::{
        console::{ConsoleAppender, Target},
        file::FileAppender,
    },
    config::{Appender, Config, Root},
    encode::pattern::PatternEncoder,
    filter::threshold::ThresholdFilter,
};
use std::sync::Mutex;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

lazy_static! {
    static ref LOGGED_IN: Mutex<Vec<bool>> = Mutex::new(vec![false]);
}

#[tauri::command]
fn login(username: &str, password: &str) -> bool {
    // Importar el esquema para poder obtener los datos
    // use self::schema::posts::dsl::*;
    debug!("Iniciando sesión.");
    // Encrypt the password and compare with the db
    // let hash_password = hash(password, 10).expect("No se ha podido encriptar");
    trace!("Usuario : {}  password : {}", username, password);
    use self::schema::usuarios::dsl::*;
    let connection = &mut establish_connection();
    // TODO: Encriptar password
    let result = usuarios
        .filter(nombre.eq(username))
        .select(contrasenia)
        .load::<String>(connection)
        .expect("Error obteniendo datos");

    LOGGED_IN.lock().unwrap().push(true);
    if result.len() == 0 {
        warn!("Resultados vacios en db");
        return false;
    }
    if !verify(password, &result[0]).expect("Error verificando") {
        error!(
            "contraseña {} con hash en db {} no coiniciden",
            password, &result[0]
        );
        return false;
    }
    return true;
}

#[cfg(debug_assertions)]
#[tauri::command]
fn log(data: &str) {
    info!(target: "frontend_events", "{}", data);
}

#[cfg(not(debug_assertions))]
#[tauri::command]
fn log(_data: &str) {}

fn main() {
    // Build the logger
    #[cfg(debug_assertions)]
    let level = log::LevelFilter::Info;

    #[cfg(not(debug_assertions))]
    let level = log::LevelFilter::Warn;

    let file_path = "/tmp/cirmax-rs.log";

    // Build a stderr logger.
    let stderr = ConsoleAppender::builder().target(Target::Stderr).build();

    // Logging to log file.
    let logfile = FileAppender::builder()
        // Pattern: https://docs.rs/log4rs/*/log4rs/encode/pattern/index.html
        .encoder(Box::new(PatternEncoder::new("{d} - {l} - {m}\n")))
        .build(file_path)
        .unwrap();

    // Log Trace level output to file where trace is the default level
    // and the programmatically specified level to stderr.
    let config = Config::builder()
        .appender(Appender::builder().build("logfile", Box::new(logfile)))
        .appender(
            Appender::builder()
                .filter(Box::new(ThresholdFilter::new(level)))
                .build("stderr", Box::new(stderr)),
        )
        .build(
            Root::builder()
                .appender("logfile")
                .appender("stderr")
                .build(LevelFilter::Trace),
        )
        .unwrap();

    // Use this to change log levels at runtime.
    // This means you can change the default log level to trace
    // if you are trying to debug an issue and need more logs on then turn it off
    // once you are done.
    let _handle = log4rs::init_config(config).unwrap();

    #[cfg(debug_assertions)]
    debug!("Logger loaded");

    // Build the window
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, log])
        .menu(Menu::with_items([
            MenuItem::SelectAll.into(),
            Submenu::new(
                "Archivo",
                Menu::with_items([
                    MenuItem::SelectAll.into(),
                    CustomMenuItem::new("config", "Configuración").into(),
                ]),
            )
            .into(),
        ]))
        .on_menu_event(|event| match event.menu_item_id() {
            "config" => {
                let check = LOGGED_IN.lock().unwrap();
                if check[check.len() - 1] == true {
                    event.window().emit_all(event.menu_item_id(), {}).unwrap();
                    info!(target: "navigation", "Going to config.");
                } else {
                    event.window().emit_all("NOT-LOGGED", {}).unwrap();
                    error!("Not loogged in");
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
