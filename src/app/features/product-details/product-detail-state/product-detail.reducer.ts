import { createReducer, on } from '@ngrx/store'
import {
  loadProductsSuccess,
  loadProductsFailure,
} from './product-detail.action'
import { iProduct } from '../../../shared/models/product.model'

export interface ProductDetailState {
  products: iProduct[]
  error: any
}

export const initialState: ProductDetailState = {
  products: [],
  error: null,
}

export const productDetailReducer = createReducer(
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
