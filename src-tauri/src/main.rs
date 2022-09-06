#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// use self::models::*;
use diesel::prelude::*;
use cirmax::*;

#[tauri::command]
fn login(username: &str, password: &str) -> bool {
    println!("{} {}", username, password);
    // Importar el esquema para poder obtener los datos
    // use self::schema::posts::dsl::*;
    use self::schema::usuarios::dsl::*;
    let connection = &mut establish_connection();
    // TODO: Encriptar password
    let result = usuarios.filter(nombre.eq(username))
                                                    .filter(contrasenia.eq(password))
                                                    .select(contrasenia)
                                                    .load::<String>(connection).expect("Error obteniendo datos");

    if result.len() == 0 {
        return false;
    }
    return true;
}

#[tauri::command]
fn log(data: &str) {
    println!("{}", data);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, log])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
