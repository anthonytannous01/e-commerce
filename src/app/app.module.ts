import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/app-shell/navbar/navbar.component';
import { FooterComponent } from './core/app-shell/footer/footer.component';
import { ProductDetailComponent } from './features/product-details/components/product-detail/product-detail.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';
import { AuthService } from './core/auth/services/auth.service';
import { AuthGuard } from './core/auth/guards/auth.guard'; // Import the AuthGuard
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/auth/interceptors/error.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminComponent } from './admin/admin.component';
import { WelcomeMessagePipe } from './shared/pipes/welcome-message.pipe';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { GridModule, PagerModule, FilterService } from '@syncfusion/ej2-angular-grids';
import { ModuleRegistry } from '@ag-grid-community/core';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { CategoryComponent } from './features/components/category/category.component';
import { ProductCardComponent } from './shared/components/products-card/product-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProductDetailCardComponent } from './shared/components/product-detail-card/product-detail-card.component';
import { FeaturesModule } from './features/features.module';
import { FavoriteComponent } from './features/components/favorite/favorite.component';
import { FavoriteButtonComponent } from './shared/components/favorite-button/favorite-button.component';
import { CartComponent } from './features/components/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { signInReducer } from './core/auth/states/sign-in-state/sign-in.reducer';
import { SignInEffects } from './core/auth/states/sign-in-state/sign-in.effect';
import { signUpReducer } from './core/auth/states/sign-up-state/sign-up.reducer';
import { SignUpEffects } from './core/auth/states/sign-up-state/sign-up.effect';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment'; // Make sure this path is correct

ModuleRegistry.registerModules([
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

const dbConfig: DBConfig = {
  name: 'myEcommerceApp',
  version: 1,
  objectStoresMeta: [
    {
      store: 'cart',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'product_id', keypath: 'product_id', options: { unique: false } },
        { name: 'title', keypath: 'title', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductDetailCardComponent,
    ProductCardComponent,
    SignUpComponent,
    ProductListComponent,
    AdminComponent,
    WelcomeMessagePipe,
    CategoryComponent,
    FavoriteComponent,
    FavoriteButtonComponent,
    CartComponent,
    CheckoutComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    NgxPermissionsModule.forRoot(),
    AgGridModule,
    GridModule,
    PagerModule,
    FeaturesModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('signIn', signInReducer),
    StoreModule.forFeature('signUp', signUpReducer),
    EffectsModule.forRoot([SignInEffects, SignUpEffects]),

    // Firebase modules
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase
    AngularFireAuthModule, // Add Firebase Authentication
  ],
  providers: [
    FilterService,
    AuthService,
    AuthGuard, // Provide the AuthGuard
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}