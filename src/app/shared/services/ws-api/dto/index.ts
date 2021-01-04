import * as Authentication from "./authentication";
import * as Common from "./common";
import * as Events from "./events";

export type Message =
    Common.ErrorMessageDto | Common.KeepaliveDto |
    Authentication.RequestDto | Authentication.ResponseDto |
    Events.EventMessage;

export { Common, Authentication, Events };
