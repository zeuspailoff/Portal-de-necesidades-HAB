import getPool from './getPool.js';
import dotenv from 'dotenv';
import errors from '../helpers/errors.helper.js';
import fs from 'fs';
import path from 'path';

const createDirectories = () => {
  const { UPLOADS_DIR } = process.env
  const currentDirectory = process.cwd();
  const publicPath = path.join(currentDirectory, UPLOADS_DIR);
  const uploadsPath = path.join(publicPath, 'uploads');
  const usersPath = path.join(uploadsPath, 'users');
  const demandsPath = path.join(uploadsPath, 'demands');
  const proposalsPath = path.join(uploadsPath, 'proposals');

  createDirectoryIfNotExists(publicPath);
  createDirectoryIfNotExists(uploadsPath);
  createDirectoryIfNotExists(usersPath);
  createDirectoryIfNotExists(demandsPath);
  createDirectoryIfNotExists(proposalsPath);
};

const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directorio creado: ${directoryPath}`);
  } else {
    console.log(`El directorio ya existe: ${directoryPath}`);
  }
};

createDirectories();

dotenv.config();

const { MYSQL_DB } = process.env;

const dropVotesTableQuery = 'DROP TABLE IF EXISTS proposals_votes';
const dropUsersTableQuery = 'DROP TABLE IF EXISTS users';
const dropDemandsTableQuery = 'DROP TABLE IF EXISTS demands';
const dropCategoriesTableQuery = 'DROP TABLE IF EXISTS categories';
const dropProposalsTableQuery = 'DROP TABLE IF EXISTS proposals';
const dropFilesTableQuery = 'DROP TABLE IF EXISTS files';

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`;
const useDatabaseQuery = `USE ${MYSQL_DB}`;

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    lastname VARCHAR(50),
    phone VARCHAR(20),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    biography TEXT,
    birthdate DATE,
    password VARCHAR(255),
    is_active TINYINT(1) default 0,
    registration_code VARCHAR(30),
    password_recovered VARCHAR(255) default NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP default NULL
);
`;

const createCategoriesTableQuery = `
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255)
);
`;

const createDemandsTableQuery = `
CREATE TABLE IF NOT EXISTS demands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
    is_closed BOOLEAN DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
`;

const createProposalsTableQuery = `
CREATE TABLE IF NOT EXISTS proposals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    demand_id INT,
    description TEXT,
    is_correct BOOLEAN default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (demand_id) REFERENCES demands(id)
);
`;

const seedCategoriesTableQuery = `
INSERT INTO categories (value) VALUES 
('Web Design'),
('Translations'),
('Developing'),
('MovieMakers'),
('Digital Marketing');
`;

const createFilesTableQuery = `
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    src VARCHAR(255),
    proposal_id INT,
    demand_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (demand_id) REFERENCES demands(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const createProposalsVotesTableQuery = `
CREATE TABLE IF NOT EXISTS proposals_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  value TINYINT UNSIGNED NOT NULL,
  user_id INT NOT NULL,
  proposal_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_proposal (user_id, proposal_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
  );
  `;

  const poblateDB = `INSERT INTO users (name, lastname, phone, username, email, password)
VALUES
  ('John', 'Doe', '1234567890', 'johndoe', 'johndoe@example.com', 'password1'),
  ('Jane', 'Doe', '0987654321', 'janedoe', 'janedoe@example.com', 'password2');

INSERT INTO demands (user_id, title, description, category_id)
VALUES
  (1, 'Web Design for my company website', 'I need a website designed for my company. It should be modern and responsive.', 1),
  (2, 'Develop a mobile app', 'I need a mobile app developed for my business. It should be user-friendly and have the following features:', 2);

INSERT INTO proposals (user_id, demand_id, description)
VALUES
  (2, 1, 'I can design a modern and responsive website for your company. I have experience in web design and development, and I can create a website that meets your needs.'),
  (2, 2, 'I can develop a mobile app for your business. I have experience in mobile app development, and I can create an app that has the features you need.');

INSERT INTO proposals (user_id, demand_id, description)
VALUES
  (1, 2, 'I can develop a mobile app for your business. I have experience in mobile app development, and I can create an app that has the features you need.'),
  (1, 1, 'I can design a modern and responsive website for your company. I have experience in web design and development, and I can create a website that meets your needs.');`


const initDb = async () => {
  try {
    const pool = await getPool();

    await pool.query(createDatabaseQuery);
    await pool.query(useDatabaseQuery);

    await pool.query(dropVotesTableQuery);
    await pool.query(dropFilesTableQuery);
    await pool.query(dropProposalsTableQuery);
    await pool.query(dropDemandsTableQuery);
    await pool.query(dropCategoriesTableQuery);
    await pool.query(dropUsersTableQuery);

    await pool.query(createUsersTableQuery);
    await pool.query(createCategoriesTableQuery);
    await pool.query(seedCategoriesTableQuery);
    await pool.query(createDemandsTableQuery);
    await pool.query(createProposalsTableQuery);
    await pool.query(createFilesTableQuery);
    await pool.query(createProposalsVotesTableQuery);
    // await pool.query(poblateDB);


    pool.end();
    console.log('Base de datos inicializada 😎');
    process.exit(0);
  } catch (error) {
    console.error('☠️Error al inicializar la base de datos:', error.message);
    errors.conflictError('Error al inicializar la base de datos', 'DATABASE_ERROR');
    process.exit(1);
  }
}

initDb();
