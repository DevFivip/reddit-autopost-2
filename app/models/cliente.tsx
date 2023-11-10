// const db = require('../database/conection');
import db from "~/database/conection";

export type TypeCliente = {
    id: number;
    usuario_id: number;
    nombre: string;
    status: boolean;
    email: string;
    reddit_username: string;
    reddit_password: string;
    reddit_clientId: string;
    reddit_clientSecret: string;
    imgur_username: string;
    imgur_password: string;
    imgur_clientId: string;
    imgur_clientSecret: string;
    created_at: string;
    updated_at: string;
};

export type NewTypeCliente = {
    nombre: string;
    email: string;
    usuario_id: number;
    reddit_username: string;
    reddit_password: string;
    reddit_clientId: string;
    reddit_clientSecret: string;
    imgur_username: string;
    imgur_password: string;
    imgur_clientId: string;
    imgur_clientSecret: string;
};

export const all = () => {
    return new Promise((suc, rej) => {
        db.all("SELECT * from clientes", function (err, rows) {
            if (err) {
                rej(err.message);
            } else {
                suc(rows);
            }
        });
    });
};
export const create = (cliente: NewTypeCliente) => {
    const {
        nombre,
        email,
        reddit_username,
        reddit_password,
        reddit_clientId,
        reddit_clientSecret,
        imgur_username,
        imgur_password,
        imgur_clientId,
        imgur_clientSecret,
    } = cliente;

    return new Promise((suc, rej) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare(
                    "INSERT INTO clientes (nombre, email, reddit_username, reddit_password, reddit_clientId, reddit_clientSecret, imgur_username, imgur_password, imgur_clientId, imgur_clientSecret, status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                );
                stmt.run(
                    nombre,
                    email,
                    reddit_username,
                    reddit_password,
                    reddit_clientId,
                    reddit_clientSecret,
                    imgur_username,
                    imgur_password,
                    imgur_clientId,
                    imgur_clientSecret,
                    1
                );
                stmt.finalize();
                suc(cliente);
            } catch (error) {
                rej(error);
            }
        });
    });
};
export const actives = (data: any) => {
    const { nombre, reddit_name, reddit_password } = data;
    return new Promise((suc, rej) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare(
                    "INSERT INTO Clientes (nombre,reddit_name,reddit_password,status) VALUES (?,?,?,1)"
                );
                stmt.run(nombre, reddit_name, reddit_password);
                stmt.finalize();
                suc(data);
            } catch (error) {
                rej(error);
            }
        });
    });
};
export const findOne = (id: number | string): Promise<TypeCliente | null> => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM clientes WHERE id = ${id}`;
        db.get(query, (err, row) => {
            if (err) {
                reject(err.message);
            } else {

                // Si no hay resultados, devolver null
                const cliente: TypeCliente | null = row ? row : null;
                resolve(cliente);
            }
        });
    });
};
export const update = (id: number, cliente: TypeCliente) => {
    const {
        nombre,
        email,
        reddit_username,
        reddit_password,
        reddit_clientId,
        reddit_clientSecret,
        imgur_username,
        imgur_password,
        imgur_clientId,
        imgur_clientSecret,
        status,
    } = cliente;

    return new Promise((resolve, reject) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare(
                    `UPDATE clientes SET
              nombre = ?,
              email = ?,
              reddit_username = ?,
              reddit_password = ?,
              reddit_clientId = ?,
              reddit_clientSecret = ?,
              imgur_username = ?,
              imgur_password = ?,
              imgur_clientId = ?,
              imgur_clientSecret = ?,
              status = ?
            WHERE id = ?`
                );

                stmt.run(
                    nombre,
                    email,
                    reddit_username,
                    reddit_password,
                    reddit_clientId,
                    reddit_clientSecret,
                    imgur_username,
                    imgur_password,
                    imgur_clientId,
                    imgur_clientSecret,
                    status,
                    id
                );

                stmt.finalize();
                resolve(cliente);
            } catch (error) {
                reject(error);
            }
        });
    });
};


export const remove = (id: string | number) => {
    return new Promise((suc, rej) => {
        db.serialize(function () {
            try {
                const stmt = db.prepare(`DELETE from clientes where id = ?`);
                stmt.run(id);
                stmt.finalize();
                suc(true);
            } catch (error) {
                rej(error)
            }
        });
    })
}



// export const create = (cliente:TypeCliente) => {

// }

// exports default =  {
//  ,
//     actives(),
//         create(data),
//         update(data, cliente_id) {
//         const { nombre, reddit_name, reddit_password } = data;
//         return new Promise((suc, rej) => {
//             db.serialize(function () {
//                 try {
//                     const stmt = db.prepare(`UPDATE Clientes set nombre= ?, reddit_name= ?, reddit_password=? where id = ?`);
//                     stmt.run(nombre, reddit_name, reddit_password, cliente_id);
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
//             db.all(`SELECT * from Clientes where id = ${id}`, function (err, rows) {
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
//                     const stmt = db.prepare(`DELETE from Clientes where id = ?`);
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
//                     const stmt = db.prepare(`UPDATE Clientes set status=? where id = ?`);
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
