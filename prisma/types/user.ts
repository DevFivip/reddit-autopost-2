export type GetAllUsers = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
