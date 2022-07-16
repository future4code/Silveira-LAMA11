import { USER_ROLE } from "./User";

export type user = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};

export type FindByEmailRes = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};
