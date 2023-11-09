// Importa la biblioteca sqlite3
// const sqlite3 = require('sqlite3').verbose();
import { Database } from 'sqlite3';
// Crea una nueva instancia de la base de datos en memoria
const db = new Database("database.db");


// Fetch a random integer between -99 and +99
// db.get(
//     'SELECT RANDOM() % 100 as result',
//     (_, res) => console.log(res)
// );
// Crea una tabla llamada 'clientes'
db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT,
        reddit_username TEXT,
        reddit_password TEXT,
        reddit_clientId TEXT,
        reddit_clientSecret TEXT,
        imgur_username TEXT,
        imgur_password TEXT,
        imgur_clientId TEXT,
        imgur_clientSecret TEXT,
        status INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

db.serialize(function () {
    db.run(`CREATE TRIGGER IF NOT EXISTS actualizar_fecha_modificacion
    AFTER UPDATE ON clientes
    FOR EACH ROW
    BEGIN
      UPDATE clientes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END`);
});

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        imagen_name TEXT,
        imagen_link_imgur TEXT,
        contenido TEXT,
        cliente_id INTEGER,
        fecha_creacion DATETIME,
        fecha_publicacion DATETIME,
        status INT,
        FOREIGN KEY(cliente_id) REFERENCES clientes(id))`);
});

db.serialize(function () {
    db.run(`CREATE TABLE  IF NOT EXISTS galleries (
        id INTEGER PRIMARY KEY,
        tags TEXT,
        archivo_nombre TEXT NOT NULL,
        fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
});

db.serialize(function () {
    db.run(`CREATE TABLE  IF NOT EXISTS subreddits (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        verificacion INTEGER,
        tags TEXT,
        status INTEGER,
        fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
});

// db.serialize(function () {
//     db.run(`CREATE TABLE  IF NOT EXISTS post (
//         id INTEGER PRIMARY KEY,
//         titulo TEXT NOT NULL,
//         descripcion TEXT,
//         file_url TEXT,
//         file_dir TEXT,
//         subreddits TEXT,
//         status INTEGER,
//         usuario_id INTEGER,
//         fecha_programada DATETIME,
//         fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY(usuario_id) REFERENCES clientes(id)
//     );`);
// });

// Cierra la conexión a la base de datos al final


export default db

// module.exports = db