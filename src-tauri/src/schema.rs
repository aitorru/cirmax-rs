// @generated automatically by Diesel CLI.

diesel::table! {
    usuarios (id) {
        id -> Int4,
        nombre -> Varchar,
        contrasenia -> Varchar,
        nombre_completo -> Varchar,
        pal_paso -> Varchar,
        clase -> Bpchar,
        estado -> Bpchar,
        fecha -> Date,
    }
}
