import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { signIn, signInFailure, signInSuccess } from './sign-in.action';
import { Router } from '@angular/router';

@Injectable()
export class SignInEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  navigateToProductList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(() => this.router.navigate(['/product-listing']))
      ),
    { dispatch: false }
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      mergeMap((action) =>
        this.authService.signIn(action.signInRequest.Username, action.signInRequest.Password).pipe(
          map((response) =>
            signInSuccess({
              response,
              Username: action.signInRequest.Username,
            })
          ),
          catchError((error) => of(signInFailure({ error })))
        )
      )
    )
  );
}