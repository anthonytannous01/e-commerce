import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../services/product.service'
import { iProduct } from '../../../shared/models/product.model'
import { Observable, BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: string[] = []
  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  products$!: Observable<iProduct[]>
  selectedCategory: string | null = null

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.selectedCategory$.pipe(
      switchMap((category) =>
        category
          ? this.productService.getProductsByCategory(category)
          : this.productService.getAllProducts()
      )
    )
    this.loadCategories()
  }

  scrollToCategory(category: string) {
    this.selectedCategory = category
    const element = document.getElementById(category)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories
    })
  }
}
