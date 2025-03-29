import { Injectable } from '@angular/core'
import { iProduct } from '../../shared/models/product.model'

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sort(products: iProduct[], option: string): iProduct[] {
    switch (option) {
      case 'none':
        return products
      case 'asc':
        return products.sort((a, b) => a.title.localeCompare(b.title))
      case 'desc':
        return products.sort((a, b) => b.title.localeCompare(a.title))
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }
}
