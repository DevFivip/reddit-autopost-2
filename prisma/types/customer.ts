import { Customer } from "@prisma/client";


// Ahora, creemos una nueva interfaz sin las propiedades 'prop3' y 'prop4'
export interface CreateCustomer extends Omit<Customer, 'createdAt' | 'updatedAt' | 'id' | 'status'> {
    // Aquí puedes agregar propiedades adicionales si lo deseas
}
// Ahora, creemos una nueva interfaz sin las propiedades 'prop3' y 'prop4'
export interface UpdateCustomer extends Omit<Customer, 'createdAt' | 'updatedAt'  | 'status'> {
    // Aquí puedes agregar propiedades adicionales si lo deseas
}
