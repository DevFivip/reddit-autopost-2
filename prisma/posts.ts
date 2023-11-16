
import { PrismaClient, Post } from "@prisma/client";
import { CreatePost, UpdatePost } from "./types/post";

const db = new PrismaClient();

export const getAll = async (query: any = false): Promise<Post[]> => {
    return await db.post.findMany(query);
};

export const create = async (post: CreatePost): Promise<Post | Error> => {
    try {
        return await db.post.create({ data: post });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const findById = async (id: number) => {
    return await db.post.findUnique({
        where: {
            id,
        },
    });
};

export const update = async (id: number, post: UpdatePost): Promise<Post> => {
    return await db.post.update({
        where: {
            id,
        },
        data: post,
    });
};

export const remove = async (id: number ): Promise<Post> => {
    return await db.post.delete({
        where: {
            id,
        },
    });
};