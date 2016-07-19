SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS flujograma;
USE flujograma;
drop table student_seccion;
drop table student_seccion_status;
drop table seccion;
drop table period;
drop table teachers;
drop table asignature_depens;
drop table asignature_career;
drop table career;
drop table asignature;
drop table asignature_category;
drop table departament;
drop table student;
create table student(
name char(40),
id char(12),
brithday date,
registry_day date,
pic MEDIUMBLOB NOT NULL,
tipof varchar(30),
 PRIMARY KEY(id)
 );
 
 
create table departament(
name char(40),
id int NOT NULL AUTO_INCREMENT,
 PRIMARY KEY(id)
 );
 

 
create table asignature_category(
name char(40),
id int NOT NULL AUTO_INCREMENT,
departament_id int,
 PRIMARY KEY(id),
 FOREIGN KEY (departament_id) REFERENCES departament(id)
 
 );
 
 create table asignature(
name char(40),
code char(12),
id int NOT NULL AUTO_INCREMENT,
category_id int,
uv int,
 PRIMARY KEY(id),
  FOREIGN KEY (category_id) REFERENCES asignature_category(id)
 );
 
  create table career(
name char(40),
departament_id int,
id int NOT NULL AUTO_INCREMENT,
 PRIMARY KEY(id),
  FOREIGN KEY (departament_id) REFERENCES departament(id)
 );
 
 create table asignature_career(
 asignature_id int,
 career_id int,
 px int,
 py int,
    PRIMARY KEY(asignature_id,career_id),
   FOREIGN KEY (asignature_id) REFERENCES asignature(id),
      FOREIGN KEY (career_id) REFERENCES career(id)
 );
 
create table asignature_depens(
asignature_id int,
asignature_dependes int,
 career_id int,
PRIMARY KEY(asignature_id,asignature_dependes),
      FOREIGN KEY (asignature_id) REFERENCES asignature(id),
	        FOREIGN KEY (asignature_dependes) REFERENCES asignature(id),
			      FOREIGN KEY (career_id) REFERENCES career(id)
);

 create table teachers(
name char(40),
id int,
brithday date,
 PRIMARY KEY(id)
 );
 
 
 create table period(
 id int NOT NULL AUTO_INCREMENT,
 name char(20),
 years int,
  PRIMARY KEY(id)
 );
 
 create table seccion(
 id int NOT NULL AUTO_INCREMENT,
 code char(4),
 teacher_id int,
 asignature_id int,
 period_id int,
 nro_max_stundet int,
  PRIMARY KEY(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
	  FOREIGN KEY (asignature_id) REFERENCES asignature(id),
	    FOREIGN KEY (period_id) REFERENCES period(id)
 );
 
 create table student_seccion_status(
  id int NOT NULL AUTO_INCREMENT,
  dato char(30),
  tipo int,
    PRIMARY KEY(id)
 );
  INSERT INTO student_seccion_status (dato,tipo ) VALUES ('En Espera', 1);
   INSERT INTO student_seccion_status (dato,tipo ) VALUES ('Aceptada', 2);
 INSERT INTO student_seccion_status (dato,tipo ) VALUES ('Cancelada', 3);
 
 create table student_seccion(
 student_id char(12),
 seccion_id int,
 status_id int,
 obs char(30),
 nota int,
   PRIMARY KEY(student_id,seccion_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
	  FOREIGN KEY (seccion_id) REFERENCES seccion(id),
	    FOREIGN KEY (status_id) REFERENCES student_seccion_status(id)
 );
 