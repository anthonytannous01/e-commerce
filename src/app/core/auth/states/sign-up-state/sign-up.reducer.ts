import { createReducer, on } from '@ngrx/store'
import { signUp, signUpFailure, signUpSuccess } from './sign-up.action'
import { iSignUpResponse } from '../../models/sign-up-response.model'

export interface SignUpState {
  user: iSignUpResponse | null
  error: any
}

export const initialState: SignUpState = {
  user: null,
  error: null,
}

export const signUpReducer = createReducer(
  initialState,
  on(signUp, (state) => ({ ...state })),
  on(signUpSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(signUpFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
