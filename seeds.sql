
ALTER TABLE alumnos
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE usuarios
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE materias
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE calificaciones
alter column fecha_registro set default now(),
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

INSERT INTO usuarios (nombre, email, password_hash, fecha_nacimiento)
VALUES
('Alumno 1', 'alumno1@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-01-01'),
('Alumno 2', 'alumno2@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-02-01'),
('Alumno 3', 'alumno3@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-03-01'),
('Alumno 4', 'alumno4@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-04-01'),
('Alumno 5', 'alumno5@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-05-01'),
('Alumno 6', 'alumno6@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-06-01'),
('Alumno 7', 'alumno7@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-07-01'),
('Alumno 8', 'alumno8@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-08-01'),
('Alumno 9', 'alumno9@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-09-01'),
('Alumno 10', 'alumno10@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-10-01'),
('Alumno 11', 'alumno11@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-11-01'),
('Alumno 12', 'alumno12@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2005-12-01'),
('Alumno 13', 'alumno13@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-01-01'),
('Alumno 14', 'alumno14@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-02-01'),
('Alumno 15', 'alumno15@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-03-01'),
('Alumno 16', 'alumno16@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-04-01'),
('Alumno 17', 'alumno17@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-05-01'),
('Alumno 18', 'alumno18@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-06-01'),
('Alumno 19', 'alumno19@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-07-01'),
('Alumno 20', 'alumno20@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '2006-08-01'),
('Maestro 1', 'maestro1@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '1980-01-01'),
('Maestro 2', 'maestro2@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '1980-02-01'),
('Maestro 3', 'maestro3@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '1980-03-01'),
('Maestro 4', 'maestro4@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '1980-04-01'),
('Maestro 5', 'maestro5@example.com', '$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy', '1980-05-01'),
('Admin1', 'admin1@example.com','$2a$10$hpYhIg45wyufQyzK88Ye.etLdkBcWB7pKBQmD/fxMsLOYiQcEoaZy','1980-05-01');

insert into roles (descripcion)
values
('ADMINISTRADOR'),
('MAESTRO'),
('ALUMNO');

insert into estatus_periodo (descripcion)
values
('ACTUAL'),
('PASADO');

insert into estatus_calificacion(descripcion)
values
('ACTIVA'),
('INACTIVA'),
('EN REVISIÓN');
-- 20 alumnos
INSERT INTO usuario_roles (usuario_id, rol_id)
SELECT i, 3 FROM generate_series(1,20) AS s(i);

-- 5 maestros
INSERT INTO usuario_roles (usuario_id, rol_id)
SELECT i, 2 FROM generate_series(21,25) AS s(i);

INSERT INTO usuario_roles (usuario_id, rol_id)
VALUES (26, 1);

INSERT INTO alumnos (matricula, usuario_id)
SELECT 'A' || lpad(i::text, 4, '0'), i FROM generate_series(1,20) AS s(i);


INSERT INTO maestros (matricula, usuario_id)
SELECT 'M' || lpad((i-20)::text, 4, '0'), i FROM generate_series(21,25) AS s(i);

select * from maestros;
INSERT INTO grupos (descripcion)
VALUES
('5-1'),
('5-2'),
('5-3'),
('5-4'),
('5-0');


INSERT INTO materias (codigo, nombre)
VALUES
('MAT01', 'Matemáticas'),
('ESP01', 'Español'),
('HIS01', 'Historia'),
('ING01', 'Inglés'),
('FIS01', 'Física');

INSERT INTO periodos (fecha_inicio, fecha_fin, estatus_periodo_id)
VALUES ('2025-01-01', '2025-06-30', 1);

INSERT INTO grupo_materia_maestro (grupo_id, materia_id, maestro_id)
VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5),
(2, 1, 1), (2, 2, 2), (2, 3, 3), (2, 4, 4), (2, 5, 5),
(3, 1, 1), (3, 2, 2), (3, 3, 3), (3, 4, 4), (3, 5, 5),
(4, 1, 1), (4, 2, 2), (4, 3, 3), (4, 4, 4), (4, 5, 5),
(5, 1, 1), (5, 2, 2), (5, 3, 3), (5, 4, 4), (5, 5, 5);

INSERT INTO alumno_grupo_periodo (alumno_id, grupo_id, periodo_id) VALUES
(1, 3, 1),
(2, 5, 1),
(3, 1, 1),
(4, 4, 1),
(5, 2, 1),
(6, 3, 1),
(7, 2, 1),
(8, 5, 1),
(9, 1, 1),
(10, 4, 1),
(11, 2, 1),
(12, 5, 1),
(13, 1, 1),
(14, 3, 1),
(15, 4, 1),
(16, 2, 1),
(17, 3, 1),
(18, 4, 1),
(19, 5, 1),
(20, 1, 1);

INSERT INTO calificaciones 
(alumno_grupo_periodo_id, grupo_materia_maestro_id, periodo_id, nota, observaciones, estatus_calificacion_id)
VALUES
(1,11,1, 7.60, 'Buen desempeño', 1),
(1,12,1, 6.10, '', 1),
(1,13,1, 7.80, '', 1),
(1,14,1, 3.90, '', 1),
(1,15,1, 6.40, '', 1),
(2,21,1, 4.40, '', 1),
(2,22,1, 8.50, '', 1),
(2,23,1, 6.40, '', 1),
(2,24,1, 1.30, '', 1),
(2,25,1, 6.97, '', 1),
(3,1,1, 8.97, 'Excelente', 1),
(3,2,1, 7.37, '', 1),
(3,3,1, 5.20, '', 1),
(3,4,1, 3.00, '', 1),
(3,5,1, 6.70, '', 1),
(4,16,1, 4.97, '', 1),
(4,17,1, 8.77, '', 1),
(4,18,1, 3.90, '', 1),
(4,19,1, 7.60, '', 1),
(4,20,1, 6.40, '', 1),
(5,6,1, 1.37, '', 1),
(5,7,1, 5.57, '', 1),
(5,8,1, 6.97, '', 1),
(5,9,1, 7.80, '', 1),
(5,10,1, 5.80, '', 1),
(6,11,1, 6.70, '', 1),
(6,12,1, 7.37, '', 1),
(6,13,1, 3.00, '', 1),
(6,14,1, 5.20, '', 1),
(6,15,1, 7.30, '', 1),
(7,6,1, 6.40, '', 1),
(7,7,1, 3.90, '', 1),
(7,8,1, 8.50, '', 1),
(7,9,1, 6.97, '', 1),
(7,10,1, 4.40, '', 1),
(8,21,1, 1.67, '', 1),
(8,22,1, 5.80, '', 1),
(8,23,1, 9.40, 'Excelente', 1),
(8,24,1, 6.40, '', 1),
(8,25,1, 3.00, '', 1),
(9,1,1, 7.90, '', 1),
(9,2,1, 8.97, '', 1),
(9,3,1, 4.00, '', 1),
(9,4,1, 6.70, '', 1),
(9,5,1, 7.60, '', 1),
(10,16,1, 1.47, '', 1),
(10,17,1, 5.37, '', 1),
(10,18,1, 7.37, '', 1),
(10,19,1, 5.80, '', 1),
(10,20,1, 3.00, '', 1),
(11,6,1, 9.40, 'Muy bien', 1),
(11,7,1, 4.97, '', 1),
(11,8,1, 6.10, '', 1),
(11,9,1, 7.90, '', 1),
(11,10,1, 6.97, '', 1),
(12,21,1, 6.40, '', 1),
(12,22,1, 7.37, '', 1),
(12,23,1, 5.57, '', 1),
(12,24,1, 3.90, '', 1),
(12,25,1, 7.80, '', 1),
(13,1,1, 8.77, '', 1),
(13,2,1, 5.20, '', 1),
(13,3,1, 7.60, '', 1),
(13,4,1, 6.40, '', 1),
(13,5,1, 6.97, '', 1),
(14,11,1, 5.57, '', 1),
(14,12,1, 8.50, '', 1),
(14,13,1, 4.00, '', 1),
(14,14,1, 6.70, '', 1),
(14,15,1, 7.90, '', 1),
(15,16,1, 3.00, '', 1),
(15,17,1, 7.37, '', 1),
(15,18,1, 5.20, '', 1),
(15,19,1, 5.80, '', 1),
(15,20,1, 6.97, '', 1),
(16,6,1, 1.37, '', 1),
(16,7,1, 4.97, '', 1),
(16,8,1, 7.80, '', 1),
(16,9,1, 3.00, '', 1),
(16,10,1, 6.70, '', 1),
(17,11,1, 5.57, '', 1),
(17,12,1, 7.30, '', 1),
(17,13,1, 4.40, '', 1),
(17,14,1, 9.40, '', 1),
(17,15,1, 6.40, '', 1),
(18,16,1, 7.60, '', 1),
(18,17,1, 4.00, '', 1),
(18,18,1, 3.00, '', 1),
(18,19,1, 6.40, '', 1),
(18,20,1, 7.80, '', 1),
(19,21,1, 1.47, '', 1),
(19,22,1, 5.80, '', 1),
(19,23,1, 8.50, '', 1),
(19,24,1, 7.37, '', 1),
(19,25,1, 5.20, '', 1),
(20,1,1, 8.97, '', 1),
(20,2,1, 6.40, '', 1),
(20,3,1, 7.80, '', 1),
(20,4,1, 6.40, '', 1),
(20,5,1, 7.37, '', 1);


