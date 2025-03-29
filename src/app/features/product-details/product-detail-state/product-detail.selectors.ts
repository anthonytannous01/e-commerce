import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductDetailState } from './product-detail.reducer'

export const selectProductDetailState =
  createFeatureSelector<ProductDetailState>('productDetail')

export const selectProducts = createSelector(
  selectProductDetailState,
  (state: ProductDetailState) => state.products
)

export const selectProductDetailError = createSelector(
  selectProductDetailState,
  (state: ProductDetailState) => state.error
)
