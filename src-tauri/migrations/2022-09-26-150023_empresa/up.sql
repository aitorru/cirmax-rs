-- Your SQL goes here
CREATE TABLE empresa (
    id SERIAL PRIMARY KEY,
    NIF VARCHAR(9) NOT NULL,
    RazonSocial VARCHAR(40) NOT NULL,
    Domicilio VARCHAR(45) NOT NULL,
    CodigoPostal VARCHAR(5) NOT NULL,
    Poblacion VARCHAR(18) NOT NULL,
    Provincia VARCHAR(18) NOT NULL,
    Telefono VARCHAR(30) NOT NULL,
    TelefonoMovil VARCHAR(30) NOT NULL,
    Fax VARCHAR(30) NOT NULL,
    CorreoElectronico VARCHAR(30) NOT NULL,
    IdClinica VARCHAR(1) NOT NULL,
    IdPuesto VARCHAR(2) NOT NULL,
    ColetillaRGPD VARCHAR(2000) NOT NULL
);

INSERT INTO empresa(NIF, RazonSocial, Domicilio, CodigoPostal, Poblacion, Provincia, Telefono, TelefonoMovil, Fax, CorreoElectronico, IdClinica, IdPuesto, ColetillaRGPD) VALUES(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
