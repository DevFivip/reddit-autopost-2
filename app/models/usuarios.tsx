// const db = require('../database/conection');
import db from "~/database/conection";

export type AuthUser = {
    email: string
    password: string
}


export type TypeUser = {
    id: string | number
    email: string
    password: string
    validated_at: string
    created_at: string
    updated_at: string
}

export const verifyLogin = (credentials: AuthUser): Promise<TypeUser | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM clientes WHERE email = ? AND password = ?';
        // Utiliza parámetros seguros para evitar la inyección de SQL
        db.get(query, [credentials.email, credentials.password], (err, row : TypeUser) => {
            if (err) {
                reject(err.message);
            } else {
                // Si no hay resultados, devolver null
                resolve(row);
            }
        });
    });
};

export const getUserById = (id: TypeUser["id"]): Promise<TypeUser | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM clientes WHERE id = ? ';
        // Utiliza parámetros seguros para evitar la inyección de SQL
        db.get(query, [id], (err, row : TypeUser) => {
            if (err) {
                reject(err.message);
            } else {
                // Si no hay resultados, devolver null
                resolve(row);
            }
        });
    });
};



