import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { iProduct } from '../models/product.model'

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteProductsSubject = new BehaviorSubject<iProduct[]>([])
  favoriteProducts$ = this.favoriteProductsSubject.asObservable()

  addFavorite(product: iProduct) {
    const currentFavorites = this.favoriteProductsSubject.getValue()
    this.favoriteProductsSubject.next([...currentFavorites, product])
  }

  removeFavorite(productId: number) {
    const currentFavorites = this.favoriteProductsSubject.getValue()
    this.favoriteProductsSubject.next(
      currentFavorites.filter((p) => p.id !== productId)
    )
  }

  isFavorite(productId: number): boolean {
    const currentFavorites = this.favoriteProductsSubject.getValue()
    return currentFavorites.some((p) => p.id === productId)
  }
}
