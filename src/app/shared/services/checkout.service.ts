import { Injectable } from '@angular/core'
import { openDB, IDBPDatabase } from 'idb'
import { iProduct } from '../models/product.model'
import { CartService } from './cart.service'

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private dbPromise: Promise<IDBPDatabase>

  constructor(private cartService: CartService) {
    this.dbPromise = openDB('MyAppDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('checkout')) {
          db.createObjectStore('checkout', { keyPath: 'id' })
        }
      },
    })
  }

  // private async initDB() {
  //   // Ensure consistency in database initialization
  //   return openDB('MyAppDB', 1, {
  //     upgrade(db) {
  //       if (!db.objectStoreNames.contains('checkout')) {
  //         db.createObjectStore('checkout', { keyPath: 'id' })
  //       }
  //     },
  //   })
  // }

  async transferCartToCheckout(): Promise<void> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readwrite')
      const store = tx.objectStore('checkout')

      const cartProducts = this.cartService.getCartProducts()

      await store.clear()

      for (const product of cartProducts) {
        await store.put(product)
      }

      await tx.done
      console.log('Cart transferred to IndexedDB successfully.')
    } catch (error) {
      console.error('Error transferring cart to IndexedDB:', error)
      throw error
    }
  }

  async getCheckoutCart(): Promise<iProduct[]> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readonly')
      const store = tx.objectStore('checkout')
      return await store.getAll()
    } catch (error) {
      console.error('Error fetching checkout cart from IndexedDB:', error)
      throw error
    }
  }

  async clearCheckoutData(): Promise<void> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readwrite')
      const store = tx.objectStore('checkout')
      await store.clear()
      await tx.done
      console.log('Checkout data cleared from IndexedDB.')
    } catch (error) {
      console.error('Error clearing checkout data:', error)
      throw error
    }
  }

  async completeCheckout(products: iProduct[]): Promise<void> {
    try {
      console.log('Sending checkout data to server:', products)
    } catch (error) {
      throw new Error('Failed to complete checkout')
    }
  }

  async clearCartData(): Promise<void> {
    this.cartService.clearCart()
  }
}
