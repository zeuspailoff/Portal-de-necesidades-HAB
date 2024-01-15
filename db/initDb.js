import getPool from './getPool.js';
import dotenv from 'dotenv';
import errors from '../helpers/errors.helper.js';
import fs from 'fs';
import path from 'path';

const createDirectories = () => {
  const currentDirectory = process.cwd();
  const publicPath = path.join(currentDirectory, 'public');
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
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    biography TEXT,
    password VARCHAR(255),
    registration_code VARCHAR(30),
    is_active TINYINT(1) default 0,
    birthdate DATE,
    phone VARCHAR(20),
    name VARCHAR(255),
    password_recovered VARCHAR(255) default NULL,
    lastname VARCHAR(255),
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

const createFilesTableQuery = `
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(255),
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
    await pool.query(createDemandsTableQuery);
    await pool.query(createProposalsTableQuery);
    await pool.query(createFilesTableQuery);
    await pool.query(createProposalsVotesTableQuery);

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
