import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CheckoutService } from '../../../shared/services/checkout.service'
import { iProduct } from '../../../shared/models/product.model'
import { Router } from '@angular/router'
import { CartService } from '../../../shared/services/cart.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutCart: iProduct[] = []
  addressForm: FormGroup

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.checkoutCart = await this.checkoutService.getCheckoutCart()
  }

  async completeCheckout() {
    if (this.addressForm.valid) {
      try {
        await this.checkoutService.completeCheckout(this.checkoutCart)
        await this.checkoutService.clearCheckoutData()
        await this.checkoutService.clearCartData()

        alert('Your order is on the way!')
        this.router.navigate(['/product-listing'])
      } catch (error) {
        console.error('Checkout failed:', error)
        alert('Checkout failed. Please try again.')
      }
    } else {
      alert('Please fill in all required fields.')
    }
  }

  getTotalPrice(): number {
    const total = this.checkoutCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )

    return parseFloat(total.toFixed(2))
  }
}
