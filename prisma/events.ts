
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
            post: true,
            customer: true,
            subreddit: true,
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


export const findByPerDay = async (id: number, fecha: string) => {
    console.log(fecha)

    const _fecha = fecha.split('T');
    console.log(_fecha)
    const fechaA = _fecha[0] + 'T00:00:00.999Z'
    const fechaB = _fecha[0] + 'T23:59:59.999Z'


    const fechaInicio = new Date(fechaA);

    const fechaFin = new Date(fechaB);

    return await db.event.findMany({
        include: {
            post: true,
            customer: true,
            subreddit: true,
        },
        where: {
            customer_id: id,
            fechaAt: {
                gte: fechaInicio,
                lte: fechaFin,
            },
            post_id: null,
        },
    });
};

export const updatePostStatus = async (customer_id: number, subreddit_id: number, fecha: Date, post_id: number): Promise<Any> => {

    const fechaConsulta = new Date(fecha);
    const fechaInicio = new Date(fechaConsulta);
    fechaInicio.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

    const fechaFin = new Date(fechaConsulta);
    fechaFin.setHours(23, 59, 59, 999); // Establecer la hora a las 23:59:59.999


    return await db.event.updateMany({
        where: {
            customer_id: customer_id,
            subreddit_id: subreddit_id,
            fechaAt: {
                gte: fechaInicio,
                lte: fechaFin,
            },
        },
        data: {
            post_id: post_id,
        },
    });
};