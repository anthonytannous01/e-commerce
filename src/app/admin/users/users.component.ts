import { Component, OnInit } from '@angular/core'
import { users } from './dummy-users'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = users

  constructor() {}

  ngOnInit(): void {}
}
