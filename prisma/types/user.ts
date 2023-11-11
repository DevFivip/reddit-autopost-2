import { User } from "@prisma/client";



export type CredentialsLogin = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  token: string;
  role_id: number;
};

export const EmptyAutorizeUser: AuthUser = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  role_id: 0
};
