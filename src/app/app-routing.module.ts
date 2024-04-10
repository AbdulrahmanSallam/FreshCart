import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
  title:"Freshcart",
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'products',
        title:"products",
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'details/:id',
        title:"details",
        loadComponent: () =>
          import('./components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'brands',
        title:"brands",
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      {
        path: 'categories',
        title:"categories",
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'cart',
        title:"cart",
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'checkout/:id',
        title:"checkout",
        loadComponent: () =>
          import('./components/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'setting',
        title:"setting",
        loadComponent: () =>
          import('./components/setting/setting.component').then(
            (m) => m.SettingComponent
          ),
      },
      {
        path: 'allorders',
        title:"orders",
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
      },
      {
        path: 'wishlist',
        title:"wishlist",
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title:"login",
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        title:"register",
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forgetpassword',
        title:"forgetPassword",
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
      },
    ],
  },
  {
    path: '**',
    title:"404",
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
