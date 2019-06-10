create table Person (
	id SERIAL UNIQUE,
	cpf varchar(11) NOT NULL PRIMARY KEY UNIQUE,
	personName varchar(50) NOT NULL,
	birth date,
	sex varchar(1)
);

create table Patient (
	healthPlan varchar(20),
	patientID int REFERENCES Person (id)
);