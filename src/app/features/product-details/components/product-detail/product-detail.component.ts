import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../../services/product.service'
import { iProduct } from '../../../../shared/models/product.model'
import { Observable, of, switchMap } from 'rxjs'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: iProduct
  favoriteProducts: Set<number> = new Set<number>()
  cartProducts: Set<number> = new Set<number>()
  products$!: Observable<iProduct[]>
  currentCategory: string | undefined

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!

    this.productService.getProductById(productId).subscribe((product) => {
      this.product = { ...product, quantity: product.quantity || 1 }
      this.currentCategory = this.product.category
      this.loadProducts()
    })

    this.route.paramMap.subscribe((params) => {
      const productId = +params.get('id')!
      this.loadProduct(productId)
    })
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = { ...product, quantity: product.quantity || 1 }
      this.currentCategory = this.product.category
      this.loadProducts()
    })
  }

  loadProducts(): void {
    const category = this.currentCategory || ''
    this.products$ = this.productService.getProductsByCategory(category).pipe(
      switchMap((products: iProduct[]) => {
        const filteredProducts = products.filter(
          (product) => product.id !== this.product.id
        )
        return of(filteredProducts)
      })
    )
  }
}
