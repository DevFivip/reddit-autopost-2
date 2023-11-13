
import { PrismaClient, Post } from "@prisma/client";

const db = new PrismaClient();

export const getAll = async (query: any = false): Promise<Post[]> => {
    return await db.post.findMany(query);
};
