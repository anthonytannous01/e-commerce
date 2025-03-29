import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-details/components/product-detail/product-detail.component';
import { AuthGuard } from './core/auth/guards/auth.guard'; // Import the AuthGuard
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './features/components/category/category.component';
import { ProductCardComponent } from './shared/components/products-card/product-card.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { FavoriteComponent } from './features/components/favorite/favorite.component';
import { CartComponent } from './features/components/cart/cart.component';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  {
    path: 'product-listing',
    component: ProductListComponent,
    loadChildren: () =>
      import('./features/product-listing/product-listing.module').then(
        (m) => m.ProductListingModule
      ),
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard], // Protect this route
    loadChildren: () =>
      import('./features/product-details/product-details.module').then(
        (m) => m.ProductDetailsModule
      ),
  },
  { path: 'product-card', component: ProductCardComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  { 
    path: 'favorite', 
    component: FavoriteComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  { 
    path: 'checkout', 
    component: CheckoutComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./core/auth/components/sign-in/sign-in.module').then(
        (m) => m.SignInModule
      ),
  },
  { path: 'category', component: CategoryComponent },
  { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Protect this route
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}