import { DatabaseSync } from "node:sqlite";

// Use a file-based database instead of in-memory
const db = new DatabaseSync("./database.db");
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT  NOT NULL,
    password TEXT  NOT NULL
    )   
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

export default db;
