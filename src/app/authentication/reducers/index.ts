import * as AuthenticationReducers from "./authentication.reducers";
import * as LoginViewReducers from "./login-view.reducers";

// tslint:disable-next-line: no-namespace
export namespace AuthenticationModuleReducers {
    export const featureKey = "authentication";

    export interface State {
        authentication: AuthenticationReducers.State;
        loginView: LoginViewReducers.State;
    }

    export interface AppState {
        [featureKey]: State;
    }

    export const reducers = {
        authentication: AuthenticationReducers.reducer,
        loginView: LoginViewReducers.reducer
    };
}
