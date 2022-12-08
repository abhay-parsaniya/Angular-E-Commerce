import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/model/products.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public products: Products[] = [];
  public fileredData: Products[] = [];
  public totalItem: any;
  public searchTerm !: string;
  public user_email: string = "";
  public isAdmin: boolean = false;

  isloggedIn: boolean = this.authService.isLoggedIn;
  isHeaderBtnShown: boolean = false

  constructor(private cartService: CartService, private authService: AuthService, private notifyService: NotificationService, private productsService: ProductsService, private router: Router) {
    this.router.events.subscribe(() => {
      this.authService.checkRole();
      this.isAdmin = this.authService.isAdmin;
      this.getCartCount();
      if (this.authService.checkLogin()) {
        this.isHeaderBtnShown = true;
      }
      else {
        this.isHeaderBtnShown = false;
      }
    })
  }

  ngOnInit(): void {
    this.getCartCount();
  }

  getCartCount() {
    this.authService.getUserEmail();
    if (this.authService.user_email) {
      this.cartService.getCartItems()
        .subscribe(res => {
          this.products = Object.keys(res).map((key: any) => {
            res[key] = { ...res[key], id: key }
            return res[key];
          });
          this.products = this.products.filter((product: any) => product.user_email == this.user_email)

          this.totalItem = this.products.length;
        });
    }
  }

  // getUserEmail() {
  //   const user_obj = JSON.parse(localStorage.getItem("user_token") as string);
  //   if (user_obj)
  //     this.user_email = user_obj.email
  // }

  onLogOut() {
    this.totalItem = 0;
    this.authService.logOut();
    this.notifyService.showWarning("Logut successfully!!", "Success");
    this.isHeaderBtnShown = false;
    this.authService.checkRole();
    this.authService.getUserEmail();
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.router.navigate([''], { queryParams: { search: this.searchTerm } });
  }
}
