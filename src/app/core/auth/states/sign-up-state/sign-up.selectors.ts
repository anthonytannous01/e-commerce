import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SignUpState } from './sign-up.reducer'

export const selectSignUpState = createFeatureSelector<SignUpState>('signUp')

export const selectSignUpUser = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.user
)

export const selectSignUpError = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.error
)
