
import { PrismaClient, Subreddit } from "@prisma/client";
import { CreateSubreddit, UpdateSubreddit } from "./types/subreddit";
// import type { subreddit, UpdateUser } from "./types/user";

const db = new PrismaClient();

export const getAll = async (query:any=false): Promise<Subreddit[]> => {
    return await db.subreddit.findMany(query);
};

export const findById = async (id: number) => {
    return await db.subreddit.findUnique({
        where: {
            id,
        },
    });
};

export const create = async (subreddit: CreateSubreddit): Promise<Subreddit> => {
    try {
        return await db.subreddit.create({ data: subreddit });
    } catch (error) {
        console.error("Error creating subreddit:", error);
        throw error;
    }
};

export const update = async (id: number, subreddit: UpdateSubreddit): Promise<Subreddit> => {
    return await db.subreddit.update({
        where: {
            id,
        },
        data: subreddit,
    });
};


export const remove = async (id: number): Promise<Subreddit> => {
    return await db.subreddit.delete({
        where: {
            id,
        },
    });
};
