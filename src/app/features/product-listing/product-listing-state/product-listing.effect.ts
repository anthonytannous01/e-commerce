import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './product-listing.action'
import { ProductService } from '../../services/product.service'

@Injectable()
export class ProductListingEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
