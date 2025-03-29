import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, combineLatest } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { iProduct } from '../../shared/models/product.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('')
  searchQuery$ = this.searchQuerySubject.asObservable()

  private productsSubject = new BehaviorSubject<iProduct[]>([])
  products$ = this.productsSubject.asObservable()

  constructor(private http: HttpClient) {}

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query)
  }

  setProducts(products: iProduct[]) {
    this.productsSubject.next(products)
  }

  searchProducts(query: string): Observable<iProduct[]> {
    return combineLatest([this.searchQuery$, this.products$]).pipe(
      map(([searchQuery, products]) => {
        if (searchQuery) {
          return products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        } else {
          return products
        }
      })
    )
  }
}
