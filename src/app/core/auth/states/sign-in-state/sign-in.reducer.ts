import { createReducer, on } from '@ngrx/store'
import { signIn, signInFailure, signInSuccess } from './sign-in.action'
import { iSignInResponse } from '../../models/sign-in-response.model'

export interface SignInState {
  response: iSignInResponse | null
  Username: string | null
  error: string | null
}

export const initialState: SignInState = {
  response: null,
  Username: null,
  error: null,
}

export const signInReducer = createReducer(
  initialState,
  on(signIn, (state) => ({ ...state })),
  on(signInSuccess, (state, { response, Username }) => ({
    ...state,
    response,
    Username,
    error: null,
  })),
  on(signInFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
