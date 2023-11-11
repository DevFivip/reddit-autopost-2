
import { PrismaClient, Customer } from "@prisma/client";
// import type { Customer, UpdateUser } from "./types/user";

const db = new PrismaClient();

export const getAll = async (): Promise<Customer[]> => {
    return await db.customer.findMany();
};

export const findById = async (id: number) => {
    return await db.customer.findUnique({
        where: {
            id,
        },
    });
};

export const create = async (customer: Customer): Promise<Customer> => {
    try {
        return await db.customer.create({ data: customer });
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const update = async (id: number, customer: Customer): Promise<Customer> => {
    return await db.customer.update({
        where: {
            id,
        },
        data: customer,
    });
};


export const remove = async (id: number): Promise<Customer> => {
    return await db.customer.delete({
        where: {
            id,
        },
    });
};