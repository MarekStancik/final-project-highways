import { createReducer, on } from "@ngrx/store";
import { AuthenticationActions } from "../actions";
import { ResponseDto } from "../models";
import { InfoDto } from "../models/info-dto";

export interface State {
    initialized: boolean;
    tokenInfo: ResponseDto;
    authInfo: InfoDto;
}

export const initialState: State = {
    initialized: false,
    tokenInfo: null,
    authInfo: null
};

export const reducer = createReducer(
    initialState,

    on(AuthenticationActions.initializeSuccess, (state, { sessionToken }) =>
        ({ ...state, initialized: true, tokenInfo: sessionToken ? { sessionToken, sessionExpiryDate: null } : state.tokenInfo })),
    on(AuthenticationActions.loginSuccess, (state, { response }) => ({ ...state, tokenInfo: response })),
    on(AuthenticationActions.getInfoSuccess, (state, { response }) => ({ ...state, authInfo: response })),
    on(AuthenticationActions.getInfoFailure, state => ({ ...state, authInfo: null })),
    on(AuthenticationActions.logoutSuccess, state => ({ ...state, tokenInfo: null }))
);
