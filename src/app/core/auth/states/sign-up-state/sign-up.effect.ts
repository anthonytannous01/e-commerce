import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { signUp, signUpFailure, signUpSuccess } from './sign-up.action';
import { Router } from '@angular/router';

@Injectable()
export class SignUpEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  navigateToProductList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap(() => this.router.navigate(['/sign-in']))
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap((action) =>
        this.authService.signUp(
          action.signUpRequest.Email,
          action.signUpRequest.Password,
          action.signUpRequest.Firstname,
          action.signUpRequest.Lastname
        ).pipe(
          map((user) => signUpSuccess({ user })),
          catchError((error) => of(signUpFailure({ error })))
        )
      )
    )
  );
}