import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignInComponent } from './auth/components/sign-in/sign-in.component'
import { SignUpComponent } from './auth/components/sign-up/sign-up.component'
import { AuthService } from './auth/services/auth.service'
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component'

@NgModule({
  declarations: [SignUpComponent, AdminComponent, OrdersComponent, ProductsComponent, UsersComponent],
  imports: [SignInComponent, CommonModule, FormsModule],
  exports: [SignInComponent, SignUpComponent],
  providers: [AuthService],
})
export class CoreModule {}
