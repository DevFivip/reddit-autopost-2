import { Customer, Post, User } from "@prisma/client";

export interface PostWithCustomerAndUser extends Post {
    // Aquí puedes agregar propiedades adicionales si lo deseas
    Customer: Customer
    User: User
}