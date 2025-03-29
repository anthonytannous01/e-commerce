import { Component, OnInit } from '@angular/core'
import { orders } from './dummy-orders'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders = orders

  constructor() {}

  ngOnInit(): void {}
}
