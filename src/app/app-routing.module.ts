import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { EditListedProductComponent } from './component/edit-listed-product/edit-listed-product.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { UsersComponent } from './component/users/users.component';
// import { ListedProductsComponent } from './component/listed-products/listed-products.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { GuardGuard } from './guard/guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  {
    path: 'products', children: [
      {
        path: '', component: ProductsComponent,
      },
      {
        path: ':id', component: DetailProductComponent
      }
    ]
  },
  { path: 'cart', component: CartComponent, canActivate: [GuardGuard] },
  {
    path: 'admin',
    children: [
      {
        path: '', component: AdminComponent
      },
      {
        path: 'users', 
        children:[
          {
            path:'' , component: UsersComponent
          },
          {
            path:':id' , component: EditUserComponent
          }
        ]
      },
      {
        path: ':id', component: EditListedProductComponent
      },
    ],
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
