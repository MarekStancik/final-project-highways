import { createAction, props } from "@ngrx/store";

const category = "login-view";

export const reset = createAction(`${category}/reset`);

export const loginSuccess = createAction(`${category}/login-success`);
export const loginFailure = createAction(`${category}/login-failure`, props<{ errorMessage: string }>());
