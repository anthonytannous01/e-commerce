import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { SearchService } from '../../../features/services/search.service'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchInput = new FormControl()
  private searchSubscription!: Subscription
  searchVisible: boolean = true

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = [
          '/category',
          '/profile',
          '/sign-in',
          '/sign-in/sign-up',
          '/favorite',
          '/cart',
          'checkout',
        ]

        const isHiddenRoute =
          hiddenRoutes.includes(event.url) ||
          event.url.includes('/product-detail')

        this.searchVisible = !isHiddenRoute
      }
    })
  }

  ngOnInit() {
    this.searchSubscription = this.searchInput.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        this.searchService.setSearchQuery(query)
      })
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}
