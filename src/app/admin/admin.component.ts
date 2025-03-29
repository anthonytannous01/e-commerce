import { Component } from '@angular/core'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  selectedTab: string = 'products'

  // Method to switch between tabs
  selectTab(tab: string): void {
    this.selectedTab = tab
  }
}
