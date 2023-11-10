// const db = require('../database/conection');
import db from "~/database/conection";

export type CredentialUser = {
    email: string
    password: string
}

// define the user model
export type AutorizeUser = {
    id: TypeUser["id"]
    nombre: string;
    email: string;
    token: string;
};
export const EmptyAutorizeUser = {
    id: 0,
    nombre: "",
    email: "",
    token: ""
};

export type TypeUser = {
    id: string | number
    nombre: string
    email: string
    password: string
    validated_at: string
    created_at: string
    updated_at: string
}

export const verifyLogin = (credentials: CredentialUser): Promise<TypeUser | string> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
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



