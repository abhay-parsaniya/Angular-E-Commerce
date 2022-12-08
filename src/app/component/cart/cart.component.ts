import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public cartItems: any = [];
  public grandTotal !: number;
  public quantity: number = 0;
  public totalPrice: number = 0;
  public totalItem: number = 0;
  public user_email: string = "";

  constructor(private cartService: CartService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getUserEmail();
    this.getAllCartItems()
  }

  getAllCartItems() {
    this.cartService.getCartItems()
      .subscribe(res => {
        this.products = Object.keys(res).map((key: any) => {
          res[key] = { ...res[key], id: key }
          return res[key];
        });
        this.products = this.products.filter((product :any) => product.user_email == this.user_email)
        this.cartItems = this.products;
        this.totalItem = this.products.length;
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  getUserEmail() {
    const user_obj = JSON.parse(localStorage.getItem("user_token") as string);
    this.user_email = user_obj.email
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item).subscribe(res => {
      this.notifyService.showWarning("Removed from cart successfully !!", "Success")
      this.getAllCartItems();
    });
  }
}
