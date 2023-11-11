
import { PrismaClient, Subreddit } from "@prisma/client";
import { CreateSubreddit, UpdateSubreddit } from "./types/subreddit";
// import type { Customer, UpdateUser } from "./types/user";

const db = new PrismaClient();

export const getAll = async (): Promise<Subreddit[]> => {
    return await db.subreddit.findMany();
};

export const findById = async (id: number) => {
    return await db.subreddit.findUnique({
        where: {
            id,
        },
    });
};

export const create = async (customer: CreateSubreddit): Promise<Subreddit> => {
    try {
        return await db.subreddit.create({ data: customer });
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const update = async (id: number, customer: UpdateSubreddit): Promise<Subreddit> => {
    return await db.subreddit.update({
        where: {
            id,
        },
        data: customer,
    });
};


export const remove = async (id: number): Promise<Subreddit> => {
    return await db.subreddit.delete({
        where: {
            id,
        },
    });
};