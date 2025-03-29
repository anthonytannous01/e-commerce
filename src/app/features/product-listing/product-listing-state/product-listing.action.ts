import { createAction, props } from '@ngrx/store'
import { iProduct } from '../../../shared/models/product.model'

export const loadProducts = createAction('Load Products')

export const loadProductsSuccess = createAction(
  'Load Products Success',
  props<{ products: iProduct[] }>()
)

export const loadProductsFailure = createAction(
  'Load Products Failure',
  props<{ error: any }>()
)
