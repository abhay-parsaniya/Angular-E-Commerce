import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/model/products.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  public searchKey: string = "";
  public searchValue: any;
  public products: Products[] = [];
  public cartItems: any = [];

  constructor(private cartService: CartService, private authService: AuthService, private productsService: ProductsService, private route: ActivatedRoute, private notifyService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    // this.api.getProduct()
    // .subscribe(res=>{
    //   this.productList = res;
    //   this.filterCategory = res;
    //   this.productList.forEach((a:any) => {
    //     if(a.category ==="women's clothing" || a.category ==="men's clothing"){
    //       a.category ="fashion"
    //     }
    //     Object.assign(a,{quantity:1,total:a.price});
    //   });
    //   console.log(this.productList)
    // });

    this.authService.getUserEmail();
    this.getCartItems();
    this.fetchProducts();

    this.searchValue = this.route.snapshot.queryParams['search'];

    if (this.searchValue && this.searchValue !== "") {
      this.filteredProducts();
    }
  }

  filteredProducts() {
    this.products = this.products.filter((product: Products) => { return product.name.includes(this.searchValue) })
  }

  fetchProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map((key: any) => {
        products[key] = { ...products[key], id: key }
        return products[key];
      });
    });
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(products => {
      this.cartItems = Object.keys(products).map((key: any) => {
        products[key] = { ...products[key], id: key }

        return products[key];
      });
    })
  }

  addtocart(item: any) {
    if (this.authService.user_email) {
      item = { ...item, user_email: this.authService.user_email }

      this.cartService.addtoCart(item).subscribe(res => {
        if (res) {
          this.notifyService.showSuccess("Added to cart successfully !!", "Success")
        }
      });

      this.cartService.getCartItems();
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }
}
