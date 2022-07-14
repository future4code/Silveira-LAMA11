import { USER_ROLE } from "./User";

export type user = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};

export type UserInputDTO = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};

export type UserInputLoginDTO = {
  email: string;
  password: string;
};

export type FindByEmailRes = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
}[];
