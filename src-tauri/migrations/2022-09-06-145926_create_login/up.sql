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

INSERT INTO usuarios (nombre, contrasenia, nombre_completo, pal_paso, clase, estado, fecha) VALUES (
  'aitor', 
	'$2a$12$sUtcztxbwpkPnk5.B5lv7uv9hfhofX7FEyzfomQlzfz9MNSylokpu',
	'Aitor Ruiz',
	'paso',
	'C',
	'B',
	'2008-11-11'
);
