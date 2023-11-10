import { AutorizeUser, EmptyAutorizeUser } from "~/models/usuarios";
import authenticator from "~/services/auth.server";


export const getAutorizeUser = async (request:any): Promise<AutorizeUser | typeof authenticator>=>{
    const user: AutorizeUser = (await authenticator.isAuthenticated(request, { failureRedirect: '/login' })) || EmptyAutorizeUser;
    return user;
}