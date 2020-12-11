import { Auth } from "./auth.model";
import { DatabaseObject } from "./db-object.model";

export class UserModel extends DatabaseObject {
    username: string;
    password?: string;
    email: string;
    enabled: boolean;
    lastActivity: Date;
    authorization: Auth.AuthorizationType;
}

export class UserActivityModel extends DatabaseObject {
    date: Date;
    ipAddress: string;
}
