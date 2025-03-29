import { Component, Input, OnInit } from '@angular/core'
import { iProduct } from '../../models/product.model'
import { CartService } from '../../services/cart.service'
import { FavoriteService } from '../../services/favorite.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss'],
})
export class ProductDetailCardComponent implements OnInit {
  @Input() product!: iProduct
  formSubmitted = false
  productForm: FormGroup
  selectedSize: string | null = null
  selectedColor: string | null = null
  isInCartFlag: boolean = false
  isAddedFlag: boolean = false
  errorMessage: string | null = null
  availableColors: string[] = [
    'Black',
    'White',
    'Red',
    'Green',
    'Blue',
    'Pink',
    'Purple',
    'Grey',
  ]
  availableSizes: string[] = ['XS', 'S', 'M', 'L', 'XL']

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {
    this.productForm = this.fb.group({
      size: [null, Validators.required],
      color: [null, Validators.required],
      quantity: [1, [Validators.min(1)]],
    })
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        quantity: this.product.quantity || 1,
      })
      this.isInCartFlag = this.cartService.isInCart(
        this.product.id,
        this.selectedSize || '',
        this.selectedColor || ''
      )
    }
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

  addToCart(productId: number) {
    this.formSubmitted = true
    this.errorMessage = null

    if (this.isClothingCategory()) {
      if (!this.selectedColor || !this.selectedSize) {
        this.errorMessage = 'Please choose both color and size.'
        return
      }
    }

    const productWithSelection: iProduct = {
      ...this.product,
      color: this.selectedColor as string,
      size: this.selectedSize as string,
      quantity: this.productForm.controls['quantity'].value,
    }

    this.cartService.addToCart(productWithSelection)

    this.isAddedFlag = true
    setTimeout(() => {
      this.isAddedFlag = false
    }, 2000)
  }

  get f() {
    return this.productForm.controls
  }

  selectSize(size: string) {
    this.selectedSize = size
    this.productForm.controls['size'].setValue(size)
  }

  selectColor(color: string) {
    this.selectedColor = color
    this.productForm.controls['color'].setValue(color)
  }

  updateQuantity(change: number) {
    const currentQuantity = this.productForm.controls['quantity'].value
    const newQuantity = Math.max(currentQuantity + change, 1)
    this.productForm.controls['quantity'].setValue(newQuantity)
  }

  decrement() {
    this.updateQuantity(-1)
  }

  increment() {
    this.updateQuantity(1)
  }

  isClothingCategory(): boolean {
    return (
      this.product.category === "men's clothing" ||
      this.product.category === "women's clothing"
    )
  }
}
