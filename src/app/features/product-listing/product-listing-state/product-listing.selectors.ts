import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductListingState } from './product-listing.reducer'

export const selectProductListingState =
  createFeatureSelector<ProductListingState>('productListing')

export const selectProducts = createSelector(
  selectProductListingState,
  (state: ProductListingState) => state.products
)

export const selectProductListingError = createSelector(
  selectProductListingState,
  (state: ProductListingState) => state.error
)
