import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public quantity: number = 0;
  public totalPrice: number = 0;

  public firebaseURL = "https://e-commerce-angular-f5ef1-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get<any>(this.firebaseURL + "cart.json")
  }

  addtoCart(product: any) {
    this.getTotalPrice();
    return this.http.post<any>(this.firebaseURL + "cart.json", product)

  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  
  removeCartItem(id: any) {
    return this.http.delete<any>(this.firebaseURL + `cart/${id}.json`)
  }
}
