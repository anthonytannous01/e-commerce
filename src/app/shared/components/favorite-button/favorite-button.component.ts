import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent {
  @Input() productId!: number
  @Input() isFavorite: boolean = false
  @Output() favoriteToggled: EventEmitter<number> = new EventEmitter<number>()

  toggleFavorite() {
    this.isFavorite = !this.isFavorite
    this.favoriteToggled.emit(this.productId)
  }
}
