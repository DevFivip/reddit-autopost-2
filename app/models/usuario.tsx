// const db = require('../database/conection');
import db from "~/database/conection";

export type TypeUsuarios = {
    id: number
    nombre: string
    status: boolean
    email: string
    reddit_username: string
    reddit_password: string
    reddit_clientId: string
    reddit_clientSecret: string
    imgur_username: string
    imgur_password: string
    imgur_clientId: string
    imgur_clientSecret: string
}

export type NewTypeUsuarios = {
    nombre: string
    email: string
    reddit_username: string
    reddit_password: string
    reddit_clientId: string
    reddit_clientSecret: string
    imgur_username: string
    imgur_password: string
    imgur_clientId: string
    imgur_clientSecret: string
}


export const all = () => {
    return new Promise((suc, rej) => {
        db.all('SELECT * from usuarios', function (err, rows) {
            if (err) {
                rej(err.message)
            } else {
                suc(rows)
            }
        });
    })
}

export const create = (usuario: NewTypeUsuarios) => {
    const { nombre, email, reddit_username, reddit_password, reddit_clientId, reddit_clientSecret, imgur_username, imgur_password, imgur_clientId, imgur_clientSecret } = usuario;

    return new Promise((suc, rej) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare("INSERT INTO usuarios (nombre, email, reddit_username, reddit_password, reddit_clientId, reddit_clientSecret, imgur_username, imgur_password, imgur_clientId, imgur_clientSecret, status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                stmt.run(nombre, email, reddit_username, reddit_password, reddit_clientId, reddit_clientSecret, imgur_username, imgur_password, imgur_clientId, imgur_clientSecret,1);
                stmt.finalize();
                suc(usuario);
            } catch (error) {
                rej(error)
            }
        });
    })
}
export const actives = (data: any) => {
    const { nombre, reddit_name, reddit_password } = data;
    return new Promise((suc, rej) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare("INSERT INTO usuarios (nombre,reddit_name,reddit_password,status) VALUES (?,?,?,1)");
                stmt.run(nombre, reddit_name, reddit_password);
                stmt.finalize();
                suc(data);
            } catch (error) {
                rej(error)
            }
        });
    })
}

// export const create = (usuario:TypeUsuarios) => { 
    
// }

// exports default =  {
//  ,
//     actives(),
//         create(data),
//         update(data, usuario_id) {
//         const { nombre, reddit_name, reddit_password } = data;
//         return new Promise((suc, rej) => {
//             db.serialize(function () {
//                 try {
//                     const stmt = db.prepare(`UPDATE usuarios set nombre= ?, reddit_name= ?, reddit_password=? where id = ?`);
//                     stmt.run(nombre, reddit_name, reddit_password, usuario_id);
//                     stmt.finalize();
//                     suc(data);
//                 } catch (error) {
//                     rej(error)
//                 }
//             });
//         })
//     },
//     find(id) {
//         return new Promise((suc, rej) => {
//             db.all(`SELECT * from usuarios where id = ${id}`, function (err, rows) {
//                 if (err) {
//                     rej(err.message)
//                 } else {
//                     suc(rows[0])
//                 }
//             });
//         })
//     },
//     remove(id) {
//         return new Promise((suc, rej) => {
//             db.serialize(function () {
//                 try {
//                     const stmt = db.prepare(`DELETE from usuarios where id = ?`);
//                     stmt.run(id);
//                     stmt.finalize();
//                     suc(true);
//                 } catch (error) {
//                     rej(error)
//                 }
//             });
//         })
//     },
//     status(id, status) {
//         return new Promise((suc, rej) => {
//             db.serialize(function () {
//                 try {
//                     const stmt = db.prepare(`UPDATE usuarios set status=? where id = ?`);
//                     stmt.run(!status, id);
//                     stmt.finalize();
//                     suc(id);
//                 } catch (error) {
//                     rej(error)
//                 }
//             });
//         })
//     },
// }