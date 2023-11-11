
import { PrismaClient } from "@prisma/client";
import type { CreateUser, UpdateUser, GetAllUsers } from "./types/user";

const db = new PrismaClient();

export const getAll = async (): Promise<GetAllUsers[]> => {
    return await db.users.findMany();
};

export const findById = async (id: number) => {
    return await db.users.findUnique({
        where: {
            id,
        },
    });
};

export const create = async (user: CreateUser): Promise<GetAllUsers> => {
    try {
        return await db.users.create({ data: user });
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

export const update = async (id: number, user: UpdateUser): Promise<GetAllUsers> => {
    return await db.users.update({
        where: {
            id,
        },
        data: user,
    });
};


export const deleteContact = async (id: number): Promise<GetAllUsers> => {
    return await db.users.delete({
        where: {
            id,
        },
    });
};