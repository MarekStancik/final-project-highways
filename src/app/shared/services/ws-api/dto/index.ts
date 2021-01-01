import * as Authentication from "./authentication";
import * as Common from "./common";
import * as Events from "./events";

export type Message =
    Common.ErrorMessageDto | Common.KeepaliveDto |
    Authentication.RequestDto | Authentication.ResponseDto |
    Events.EventMessage;

export type MessageStub<M extends Message> = Omit<M, "sequenceId"> & Partial<Pick<M, "sequenceId">>;

export { Common, Authentication, Events };
