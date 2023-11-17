
import { CustomerOnSubreddit, PrismaClient, Subreddit } from "@prisma/client";
// import { CreateSubreddit, UpdateSubreddit } from "./types/subreddit";
// import type { subreddit, UpdateUser } from "./types/user";

import { Event } from "@prisma/client";

const db = new PrismaClient();

// export const getAll = async (query: any = false): Promise<Subreddit[]> => {
//     return await db.subreddit.findMany(query);
// };

export const findByCustomerId = async (id: number) => {
    return await db.event.findMany({
        include: {
            post:true,
            customer:true,
            subreddit:true,
        },
        where: {
            customer_id: id,
        },
    });
};


export const create = async (events: any[]): Promise<any> => {
    try {
        return await db.event.createMany({ data: events });
    } catch (error) {
        console.error("Error creating subreddit:", error);
        throw error;
    }
};

// export const update = async (id: number, subreddit: UpdateSubreddit): Promise<Subreddit> => {
//     return await db.subreddit.update({
//         where: {
//             id,
//         },
//         data: subreddit,
//     });
// };

// export const asingnationUpdate = async (customer_id: number, asingados: number[]): Promise<Boolean> => {
//     console.log(customer_id, asingados)
//     return new Promise(async (succ, rej) => {
//         try {

//             await db.customerOnSubreddit.deleteMany({
//                 where: { customer_id: customer_id }
//             });

//             asingados.forEach(async asignado => {
//                 await db.customerOnSubreddit.create({
//                     data: { customer_id, subreddit_id: asignado, status: 1 }
//                 });
//             });

//             succ(true);

//         } catch (error) {
//             rej(false)
//         }

//     })
// };


export const remove = async (id: number): Promise<any> => {
    try {
        const fechaActual = new Date();
        console.log(fechaActual);
        return await db.event.deleteMany({
            where: {
                customer_id: id,
                fechaAt: { gt: fechaActual }
            },
        });
    } catch (error) {
        console.error('Error al eliminar registros:', error);
        return []
    } finally {
        await db.$disconnect(); // Cierra la conexión de Prisma
    }

};
