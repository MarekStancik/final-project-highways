import { MessageBaseDto } from "../common/message-base.dto";

export interface EventMessage extends MessageBaseDto {
    type: "event";
    sequenceId?: string;
    action: ActionType;
    objectType: EntityType;
    object: any;
}

export type ActionType = "update" | "create" | "delete";

export type EntityType = "user" | "route" | "node";
