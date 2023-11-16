
import { PrismaClient, Post } from "@prisma/client";
import { CreatePost } from "./types/post";

const db = new PrismaClient();

export const getAll = async (query: any = false): Promise<Post[]> => {
    return await db.post.findMany(query);
};

export const create = async (post: CreatePost): Promise<Post | Error> => {
    console.log(post);
    try {
        return await db.post.create({ data: post });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}