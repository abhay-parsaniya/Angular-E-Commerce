import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewProduct } from 'src/app/model/products.model';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-edit-listed-product',
  templateUrl: './edit-listed-product.component.html',
  styleUrls: ['./edit-listed-product.component.scss']
})
export class EditListedProductComponent implements OnInit {

  editProductForm!: FormGroup;
  product_id: string = "";
  product_resp: any = {};

  constructor(public route: ActivatedRoute, private productsService: ProductsService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe((qParams: any) => {
      this.product_id = qParams.id;

    });
    this.productsService.getListedProduct(this.product_id).subscribe(res => this.product_resp = res)
    console.log(this.product_resp);
  }

  initializeForm() {
    this.editProductForm = new FormGroup({
      product_name: new FormControl(this.product_resp.name, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      product_description: new FormControl(this.product_resp.description, [Validators.required]),
      product_price: new FormControl(null, Validators.required),
      product_category: new FormControl(null, [Validators.required]),
      product_stock: new FormControl(null, [Validators.required]),
      product_image: new FormControl(null, Validators.required)
    })
  }

  saveEditProduct() {
    console.log(this.editProductForm.value.product_name || this.product_resp.name)
    const updateProduct: AddNewProduct = {
      name: this.editProductForm.value.product_name || this.product_resp.name,
      description: this.editProductForm.value.product_description || this.product_resp.description,
      price: this.editProductForm.value.product_price || this.product_resp.price,
      category: this.editProductForm.value.product_category || this.product_resp.category,
      stock: this.editProductForm.value.product_stock || this.product_resp.stock,
      image: "https://m.media-amazon.com/images/I/81+d6eSA0eL._UY445_.jpg",
    }
    this.productsService.editListedProduct(updateProduct, this.product_id).subscribe(res => {
      this.notifyService.showSuccess("Changes successfully saved!!", "Success");
      this.router.navigateByUrl('/admin')
    })
  }

}
