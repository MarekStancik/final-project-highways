import { SerializedError } from "src/app/common/models";

export interface SerializedApiError extends SerializedError {
    code: string;
    data: any;
}
