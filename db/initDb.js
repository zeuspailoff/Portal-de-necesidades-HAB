import getPool from './getPool.js';

const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS ineedup';
const useDatabaseQuery = 'USE ineedup';

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    biography TEXT,
    password VARCHAR(255),
    birthdate DATE,
    phone VARCHAR(20),
    name VARCHAR(255),
    password_recovered VARCHAR(255) default NULL,
    lastname VARCHAR(255),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP default NULL
);
`;

const createDemandsTableQuery = `
CREATE TABLE IF NOT EXISTS demands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
    status BOOLEAN default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
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
    entity_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES demands(id) ON DELETE CASCADE,
    FOREIGN KEY (entity_id) REFERENCES proposals(id) ON DELETE CASCADE
);
`;

const initDb = async () => {
  try {
    const pool = await getPool();

    await pool.query(createDatabaseQuery);
    await pool.query(useDatabaseQuery);

    await pool.query(createUsersTableQuery);
    await pool.query(createDemandsTableQuery);
    await pool.query(createProposalsTableQuery);
    await pool.query(createFilesTableQuery);

    pool.end();
  } catch (error) {
    console.error('☠️Error al inicializar la base de datos:', error.message);
  }
  console.log('Base de datos inicializada.😁');
}

initDb();