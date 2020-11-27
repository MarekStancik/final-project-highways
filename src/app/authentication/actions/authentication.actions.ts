import { createAction, props } from "@ngrx/store";
import { SerializedApiError } from "src/app/api/models";
import { RequestDto, ResponseDto } from "../models";
import { InfoDto } from "../models/info-dto";

const category = "authentication";

export const initialize = createAction(`${category}/initialize`);
export const initializeSuccess = createAction(`${category}/initialize-success`, props<{ sessionToken?: string }>());

export const login = createAction(`${category}/login`, props<{ request: RequestDto }>());
export const loginSuccess = createAction(`${category}/login-success`, props<{ response: ResponseDto }>());
export const loginFailure = createAction(`${category}/login-failure`, props<{ error: SerializedApiError }>());
export const logout = createAction(`${category}/logout`);
export const logoutSuccess = createAction(`${category}/logout-success`);


export const getInfo = createAction(`${category}/get-info`);
export const getInfoSuccess = createAction(`${category}/get-info-success`, props<{ response: InfoDto }>());
export const getInfoFailure = createAction(`${category}/get-info-failure`, props<{ error: SerializedApiError }>());

