import { Component, Input, OnInit } from '@angular/core'
import { iProduct } from '../../models/product.model'
import { Router } from '@angular/router'
import { FavoriteService } from '../../services/favorite.service'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: iProduct
  isInCart: boolean = false

  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // this.cartService.cartProducts$.subscribe((cartProducts) => {
    //   this.isInCart = this.cartService.isInCart(
    //     this.product.id,
    //     this.product.size,
    //     this.product.color
    //   )
    // })
  }

  viewProductDetail(productId: number) {
    this.router.navigate([`/product-detail/${productId}`])
  }

  isFavorite(productId: number): boolean {
    return this.favoriteService.isFavorite(productId)
  }

  onFavoriteToggled(productId: number) {
    if (this.isFavorite(productId)) {
      this.favoriteService.removeFavorite(productId)
    } else {
      this.favoriteService.addFavorite(this.product)
    }
  }

  addToCart() {
    this.router.navigate([`/product-detail/${this.product.id}`])
  }
}
