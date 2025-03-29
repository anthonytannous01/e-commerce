import { createAction, props } from '@ngrx/store'
import { iSignUpRequest } from '../../models/sign-up-request.model'

export const signUp = createAction(
  'Sign Up',
  props<{ signUpRequest: iSignUpRequest }>()
)

export const signUpSuccess = createAction(
  'Sign Up Success',
  props<{ user: any }>()
)

export const signUpFailure = createAction(
  'Sign Up Failure',
  props<{ error: any }>()
)
