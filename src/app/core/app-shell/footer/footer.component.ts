import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerVisible: boolean = true

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/category']
        this.footerVisible = !hiddenRoutes.includes(this.router.url)
      }
    })
  }
}
