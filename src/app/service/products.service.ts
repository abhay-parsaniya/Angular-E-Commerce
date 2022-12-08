import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddNewProduct, Products } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  firebaseURL = "https://e-commerce-angular-f5ef1-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.firebaseURL + "products.json")
  }

  getProduct(id: string) {
    return this.http.get<Products>(this.firebaseURL + "products/" + id + ".json")
  }

  addProduct(newProduct: AddNewProduct) {
    return this.http.post<Products[]>(this.firebaseURL + "products.json", newProduct)
  }

  deleteProduct(id: string) {    
    return this.http.delete<void>(this.firebaseURL + "products/" + id + ".json")
  }

  getListedProduct(id: string) {
    return this.http.get<void>(this.firebaseURL + "products/" + id + ".json")
  }
  editListedProduct(newProduct: AddNewProduct,id : string){
    return this.http.put<void>(this.firebaseURL + "products/" + id + ".json",newProduct)
  }
}
