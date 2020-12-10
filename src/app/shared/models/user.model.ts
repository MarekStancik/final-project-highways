import { DatabaseObject } from "./db-object.model";

export class UserModel extends DatabaseObject {
    username: string;
    password?: string;
    email: string;
}

export class UserActivityModel extends DatabaseObject {
    date: Date;
    ipAddress: string;
}