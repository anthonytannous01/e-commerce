import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { FavoriteService } from '../../../shared/services/favorite.service'
import { iProduct } from '../../../shared/models/product.model'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteProducts$: Observable<iProduct[]>

  constructor(private favoriteService: FavoriteService) {
    this.favoriteProducts$ = of([])
  }

  ngOnInit() {
    this.favoriteProducts$ = this.favoriteService.favoriteProducts$
  }
}
