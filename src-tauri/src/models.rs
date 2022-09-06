use diesel::prelude::*;
// use diesel::pg::data_types::PgDate;

#[derive(Queryable)]
pub struct Usuario {
    pub id: i32,
    pub nombre: String,
    pub contrasenia: String,
    pub nombre_completo: String,
    pub pal_paso: String,
    pub clase: char,
    pub estado: char,
}