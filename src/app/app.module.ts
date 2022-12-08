import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ButtonComponent } from './component/button/button.component';
import { AdminComponent } from './component/admin/admin.component';
import { ListedProductsComponent } from "./component/listed-products/listed-products.component";
import { EditListedProductComponent } from './component/edit-listed-product/edit-listed-product.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { UsersComponent } from './component/users/users.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { GuardGuard } from './guard/guard.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CartComponent,
        ProductsComponent,
        FilterPipe,
        HomeComponent,
        SignUpComponent,
        SignInComponent,
        ButtonComponent,
        AdminComponent,
        ListedProductsComponent,
        EditListedProductComponent,
        DetailProductComponent,
        UsersComponent,
        EditUserComponent
    ],
    providers: [GuardGuard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ]
})
export class AppModule { }
