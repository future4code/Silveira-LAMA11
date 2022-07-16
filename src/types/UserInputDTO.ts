import { USER_ROLE } from "../model/User";

export type UserInputDTO = {
    name: string;
    email: string;
    password: string;
    role: USER_ROLE;
};
