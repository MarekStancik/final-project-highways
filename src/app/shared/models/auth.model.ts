export namespace Auth {
    
    export interface Request {
        username: string;
        password: string;
    }
    
    export interface Response {
        sessionToken: string;
        expiryDate: Date;
    }

    export interface Info {
        
    }
}