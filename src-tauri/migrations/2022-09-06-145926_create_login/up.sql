-- Your SQL goes here
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(8) NOT NULL,
  contrasenia VARCHAR(100) NOT NULL,
  nombre_completo VARCHAR(50) NOT NULL,
  pal_paso VARCHAR(8) NOT NULL,
  clase CHAR(1) NOT NULL,
  estado CHAR(1) NOT NULL,
  fecha DATE NOT NULL
);