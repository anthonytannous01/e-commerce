import { createAction, props } from '@ngrx/store'
import { iSignInRequest } from '../../models/sign-in-request.model'
import { iSignInResponse } from '../../models/sign-in-response.model'

export const signIn = createAction(
  'Sign In',
  props<{ signInRequest: iSignInRequest }>()
)

export const signInSuccess = createAction(
  'Sign In Success',
  props<{ response: iSignInResponse; Username: string }>()
)

export const signInFailure = createAction(
  'Sign In Failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>()
)
