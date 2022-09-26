use diesel::prelude::*;
use serde::Serialize;
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

#[derive(Serialize, Queryable)]
pub struct Empresa {
    pub id: i32,
    pub nif: String,
    pub razonsocial: String,
    pub domicilio: String,
    pub codigopostal: String,
    pub poblacion: String,
    pub provincia: String,
    pub telefono: String,
    pub telefonomovil: String,
    pub fax: String,
    pub correoelectronico: String,
    pub idclinica: String,
    pub idpuesto: String,
    pub coletillargpd: String,
}
