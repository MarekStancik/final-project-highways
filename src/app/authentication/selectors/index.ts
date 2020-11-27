import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthenticationModuleReducers } from "../reducers";

export const selectAuthenticationModuleFeature =
    createFeatureSelector<AuthenticationModuleReducers.AppState, AuthenticationModuleReducers.State>
    (AuthenticationModuleReducers.featureKey);

export const selectLoginViewState = createSelector(selectAuthenticationModuleFeature, state => state.loginView);
export const selectLoginViewIsLoading = createSelector(selectLoginViewState, state => state.isLoading);
export const selectLoginViewIsSuccessful = createSelector(selectLoginViewState, state => state.isSuccessful);
export const selectLoginViewErrorMessage = createSelector(selectLoginViewState, state => state.errorMessage);

export const selectAuthenticationState = createSelector(selectAuthenticationModuleFeature, state => state.authentication);
export const selectAuthenticationInitialized = createSelector(selectAuthenticationState, state => state.initialized);
export const selectAuthenticationInfo = createSelector(selectAuthenticationState, state => state.authInfo);
export const selectAuthenticationTokenInfo = createSelector(selectAuthenticationState, state => state.tokenInfo);
