
import { PrismaClient, User } from "@prisma/client";
import type {CreateUser, CredentialsLogin } from "./types/user";

const db = new PrismaClient();

export const getAll = async (): Promise<User[]> => {
    return await db.user.findMany();
};

export const findById = async (id: number) => {
    return await db.user.findUnique({
        where: {
            id,
        },
    });
};

export const create = async (user: CreateUser): Promise<User> => {
    try {
        return await db.user.create({ data: user });
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

export const update = async (id: number, user: UpdateUser): Promise<User> => {
    return await db.user.update({
        where: {
            id,
        },
        data: user,
    });
};


export const remove = async (id: number): Promise<User> => {
    return await db.user.delete({
        where: {
            id,
        },
    });
};


export const verifyLogin = async (credenciales: CredentialsLogin) => {
    return await db.user.findUnique({
        where: {
            email: credenciales.email,
            password: credenciales.password
        },
    });
}