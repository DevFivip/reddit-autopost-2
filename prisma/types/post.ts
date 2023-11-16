import { Customer, Post, User } from "@prisma/client";

export interface PostWithCustomerAndUser extends Post {
    // Aquí puedes agregar propiedades adicionales si lo deseas
    Customer: Customer
    User: User
}

export interface CreatePost  extends Omit<Post,'imagen_link_imgur'| 'createdAt' | 'updatedAt' | 'id' | 'status' | 'customer'> {
    // Aquí puedes agregar propiedades adicionales si lo deseas
}