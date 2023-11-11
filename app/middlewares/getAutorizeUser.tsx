import { AutorizeUser,  } from "~/models/usuarios";
import authenticator from "~/services/auth.server";
import { AuthUser, EmptyAutorizeUser } from 'prisma/types/user';

export const getAutorizeUser = async (request: any): Promise<AuthUser | null> => {
    try {
      const user: AuthUser = await authenticator.isAuthenticated(request, { failureRedirect: '/login' }) || EmptyAutorizeUser;
      return user;
    } catch (error) {
      console.error('Error during authentication:', error);
      return null;
    }
  };