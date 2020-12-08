export namespace Auth {

    export interface Request {
        username: string;
        password: string;
    }

    export interface Response {
        sessionToken: string;
        expiryDate: Date;
        permissions: any;
        user: any;
    }

    export type ResourceType = "user" | "route";

    export type OperationType = "create" | "read" | "update" | "delete";

    export type Permissions = Record<ResourceType, OperationType[]>;

    export interface Info {
        permissions:  Permissions;
        user: any;
    }    
}