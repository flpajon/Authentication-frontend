import { User } from "./user";

export interface Authentication {
    accessToken: string;
    refrechToken: string;
    user: User;
}
