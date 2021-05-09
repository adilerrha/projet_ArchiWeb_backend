CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE categories (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

CREATE TABLE movies (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    director VARCHAR(50) NOT NULL,
    releaseYear INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    stateID CHAR(36) NOT NULL,
    urlImage VARCHAR(50) NOT NULL,
    userID CHAR(36) NOT NULL,
    categoryID CHAR(36) NOT NULL,
    FOREIGN KEY (stateID) REFERENCES states(id),
    FOREIGN KEY (categoryID) REFERENCES categories(id),
    FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE TABLE states (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    color VARCHAR(10)
);

INSERT INTO states (id, name,color) VALUES 
('bfe35b03-1f23-40b6-813d-0273293dfeb4', 'A voir', "red"), 
('2f7038d8-98a0-44f9-94bd-81d853d7470b', 'En cours',"gray"), 
('afa84b57-05df-4a2d-8def-51f6b07a9d36', 'Déjà vu', "green");


/**Insertion pour effectuer des tests de l'application**/

/**Un utilisateur**/
INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES ("d7ead69e-56ec-4e4c-bafd-0114ef54260f","Adil Errha", "adil.errha@hotmail.be","25f9e794323b453885f5181f1b624d0b");

/**6 catégories de tests**/
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d783e6','Action');
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d783e7','Dramatique');
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d783e8','Animation');
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d783e9','Aventure');
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d78310','Fantastique');
INSERT INTO `categories`(`id`, `name`) VALUES ('dd528c94-4d38-4c57-ae50-ef9504d78311','Horreur');

