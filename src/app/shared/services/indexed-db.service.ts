import { Injectable } from '@angular/core'
import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface CartSchema extends DBSchema {
  cart: {
    key: string
    value: any
    indexes: { 'by-id': string }
  }
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<CartSchema>>

  private db: Promise<IDBPDatabase>

  constructor() {
    this.db = openDB('UserDB', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'email' })
      },
    })
    this.dbPromise = openDB<CartSchema>('my-database', 1, {
      upgrade(db) {
        db.createObjectStore('cart', { keyPath: 'Email' })
      },
    })
  }

  async getCartItems(): Promise<any[]> {
    const db = await this.dbPromise
    return db.getAll('cart')
  }
}
