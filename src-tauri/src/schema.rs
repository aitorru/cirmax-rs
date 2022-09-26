// @generated automatically by Diesel CLI.

diesel::table! {
    empresa (id) {
        id -> Int4,
        nif -> Varchar,
        razonsocial -> Varchar,
        domicilio -> Varchar,
        codigopostal -> Varchar,
        poblacion -> Varchar,
        provincia -> Varchar,
        telefono -> Varchar,
        telefonomovil -> Varchar,
        fax -> Varchar,
        correoelectronico -> Varchar,
        idclinica -> Varchar,
        idpuesto -> Varchar,
        coletillargpd -> Varchar,
    }
}

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

diesel::allow_tables_to_appear_in_same_query!(
    empresa,
    usuarios,
);
