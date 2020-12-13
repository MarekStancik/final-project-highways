import { DatabaseObject } from "./db-object.model";

export class DeviceModel extends DatabaseObject {
    name: string;
    ipAddress: string;
    state: "active" | "inactive";
}
