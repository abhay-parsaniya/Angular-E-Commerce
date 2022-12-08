import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddNewProduct, Products } from 'src/app/model/products.model';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-listed-products',
  templateUrl: './listed-products.component.html',
  styleUrls: ['./listed-products.component.scss']
})
export class ListedProductsComponent implements OnInit {

  addProductForm!: FormGroup;
  products: Products[] = [];

  constructor(private productsService: ProductsService, private router: Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getListedProducts();
  }

  ngAfterContentInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map((key: any) => {
        products[key] = { ...products[key], id: key }
        return products[key];
      });
    });
  }

  initializeForm() {
    this.addProductForm = new FormGroup({
      product_name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      product_description: new FormControl(null, [Validators.required]),
      product_price: new FormControl(null, Validators.required),
      product_category: new FormControl(null, [Validators.required]),
      product_stock: new FormControl(null, [Validators.required]),
      product_image: new FormControl(null, Validators.required)
    })
  }

  getListedProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map((key: any) => {
        products[key] = { ...products[key], id: key }
        return products[key];
      });
      console.log(this.products);
      console.log("before",!this.products[0].stock)

    });
  }

  onAddProduct() {
    const newProduct: AddNewProduct = {
      name: this.addProductForm.value.product_name,
      description: this.addProductForm.value.product_description,
      price: this.addProductForm.value.product_price,
      category: this.addProductForm.value.product_category,
      stock: this.addProductForm.value.product_stock,
      image: "https://m.media-amazon.com/images/I/81+d6eSA0eL._UY445_.jpg",
    }
    console.log(newProduct);
    this.productsService.addProduct(newProduct).subscribe(response => {
      console.log(response);
      this.notifyService.showSuccess("Added successfully !!", "Success")
      this.getListedProducts();
    });
  }

  onEditProduct(id: string) {
    this.router.navigate(['/admin', id], {queryParamsHandling: 'preserve'});
  }

  onDeleteProduct(id: string) {
    console.log(id);

    this.productsService.deleteProduct(id).subscribe(res => {
      this.notifyService.showSuccess("Deleted successfully !!", "Success")
      this.getListedProducts();
    });
  }
}
