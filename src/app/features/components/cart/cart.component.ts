import { Component, OnInit } from '@angular/core'
import { CartService } from '../../../shared/services/cart.service'
import { Observable } from 'rxjs'
import { iProduct } from '../../../shared/models/product.model'
import { Router } from '@angular/router'
import { CheckoutService } from '../../../shared/services/checkout.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts$: Observable<iProduct[]>

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.cartProducts$ = this.cartService.cartProducts$
  }

  ngOnInit() {}

  isClothingCategory(category: string): boolean {
    const clothingCategories = ["men's clothing", "women's clothing"]
    return clothingCategories.includes(category.toLowerCase())
  }

  async editProduct(product: iProduct) {
    const { id, size, color } = product
    await this.cartService.removeFromCart(id, size, color)
    this.router.navigate([`/product-detail/${product.id}`])
  }

  getTotalPrice(cart: iProduct[]): string {
    const total = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
    return total.toFixed(2)
  }

  getTotalItems(cart: iProduct[]): number {
    return cart.reduce((total, product) => total + product.quantity, 0)
  }

  async removeProductFromCart(product: iProduct) {
    const { id, size, color } = product
    await this.cartService.removeFromCart(id, size, color)
  }

  async proceedToCheckout() {
    try {
      await this.checkoutService.transferCartToCheckout()
      this.router.navigate(['/checkout'])
    } catch (error) {
      console.error('Error transferring cart to checkout:', error)
      alert('Failed to proceed to checkout. Please try again.')
    }
  }
}
