import { DatabaseObject } from "./db-object.model";
import { DeviceModel } from "./device.model";

export class NodeModel extends DatabaseObject{
    name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    devices: DeviceModel[];
}
