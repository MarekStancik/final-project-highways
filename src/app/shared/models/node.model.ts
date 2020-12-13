import { DatabaseObject } from "./db-object.model";

export class NodeModel extends DatabaseObject{
    name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    devices: any[];
}
