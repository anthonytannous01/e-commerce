import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SignInState } from './sign-in.reducer'

export const selectSignInState = createFeatureSelector<SignInState>('signIn')

export const selectSignInResponse = createSelector(
  selectSignInState,
  (state: SignInState) => state.response
)

export const selectSignInEmail = createSelector(
  selectSignInState,
  (state: SignInState) => state.Username
)

export const selectSignInError = createSelector(
  selectSignInState,
  (state: SignInState) => state.error
)
