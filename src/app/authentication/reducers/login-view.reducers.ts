import { createReducer, on } from "@ngrx/store";
import { AuthenticationActions, LoginViewActions } from "../actions";

export interface State {
    isLoading: boolean;
    isSuccessful: boolean;
    errorMessage: string;
}

export const initialState: State = {
    isLoading: false,
    isSuccessful: false,
    errorMessage: null
};

export const reducer = createReducer<State>(
    initialState,

    on(AuthenticationActions.login, state => ({ ...state, isLoading: true, isSuccessful: false, errorMessage: null })),

    on(LoginViewActions.reset, state => ({ ...state, isLoading: false, isSuccessful: false, errorMessage: null })),
    on(LoginViewActions.loginSuccess, state => ({ ...state, isSuccessful: true })),
    on(LoginViewActions.loginFailure, (state, { errorMessage }) => ({ ...state, errorMessage }))
);
