import { PrismaClient, Customer } from "@prisma/client";
import { CreateCustomer, UpdateCustomer, CustomerWithCustomerOnSubreddit} from "./types/customer";
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

export const create = async (customer: CreateCustomer): Promise<Customer> => {
    try {
        return await db.customer.create({ data: customer });
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const update = async (id: number, customer: UpdateCustomer): Promise<Customer> => {
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

export const customersWithSubreddits = async (id: number): Promise<CustomerWithCustomerOnSubreddit | null> => {
    return await db.customer.findUnique({
        include: {
            CustomerOnSubreddit: true,
        },
        where: {
            id: id
        }
    });
};