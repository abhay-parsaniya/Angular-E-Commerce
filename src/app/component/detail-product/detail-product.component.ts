import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/model/products.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  public product_id: string = "";
  public product!: Products;
  isHeaderBtnShown: boolean = false

  constructor(private cartService: CartService, private authService: AuthService, public route: ActivatedRoute, private productsService: ProductsService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((qParams: any) => {
      this.product_id = qParams.id;
    });

    this.productsService.getProduct(this.product_id).subscribe(res => this.product = res)
  }
  onLogOut() {
    this.authService.logOut();
    this.isHeaderBtnShown = false;
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item).subscribe(res => {
      if (res) {
        this.notifyService.showSuccess("Added to cart successfully !!", "Success")
      }
    });
    this.cartService.getCartItems().subscribe(res => console.log(res)
    );
  }
}
