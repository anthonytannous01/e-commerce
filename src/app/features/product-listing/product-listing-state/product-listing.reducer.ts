import { createReducer, on } from '@ngrx/store'
import {
  loadProductsSuccess,
  loadProductsFailure,
} from './product-listing.action'
import { iProduct } from '../../../shared/models/product.model'

export interface ProductListingState {
  products: iProduct[]
  error: any
}

export const initialState: ProductListingState = {
  products: [],
  error: null,
}

export const productListingReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    error,
  }))
)
