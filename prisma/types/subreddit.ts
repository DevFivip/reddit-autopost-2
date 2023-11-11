import { Subreddit } from "@prisma/client";


// Ahora, creemos una nueva interfaz sin las propiedades 'prop3' y 'prop4'
export interface CreateSubreddit extends Omit<Subreddit, 'createdAt' | 'updatedAt' | 'id' | 'status'> {
    // Aquí puedes agregar propiedades adicionales si lo deseas
}
// Ahora, creemos una nueva interfaz sin las propiedades 'prop3' y 'prop4'
export interface UpdateSubreddit extends Omit<Subreddit, 'createdAt' | 'updatedAt'  | 'status'> {
    // Aquí puedes agregar propiedades adicionales si lo deseas
}