import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { SignInUser, SignUpNewUser, SignUpResponse } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrlKey = "AIzaSyAO0eAI3k06Zhw0HomRqCLfz5WVj7GbcxU"

  authUrlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.authUrlKey}`;
  authURLSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.authUrlKey}`;

  firebase = "https://e-commerce-angular-f5ef1-default-rtdb.firebaseio.com/"

  userSubject: Subject<SignUpResponse> = new Subject<SignUpResponse>();
  user!: SignUpResponse;

  user_email: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user_object = {};

  constructor(private http: HttpClient) { }

  checkLogin() {
    return localStorage.getItem('user_token');
  }

  checkRole() {
    const user = JSON.parse(localStorage.getItem("user_token") as string);
    if (user) {
      if (user.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  getUserEmail() {
    const user_obj = JSON.parse(localStorage.getItem("user_token") as string);
    if(user_obj) this.user_email = user_obj.email
  }

  storeUser(newUser: SignUpNewUser): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.firebase + 'user.json', newUser);
  }

  signUp(newUser: SignUpNewUser): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.authUrlSignUp, newUser);
  }

  signIn(user: SignInUser) {
    return this.http.post<SignUpResponse>(this.authURLSignIn, user);
  }

  logOut() {
    localStorage.removeItem('user_token');
  }

  getAllUsers() {
    return this.http.get<any>(this.firebase + 'user.json');
  }

  getUser(id: string) {
    return this.http.get<any>(this.firebase + 'user/' + id + '.json');
  }

  editUser(editedUser: any, id: string) {
    return this.http.put<any>(this.firebase + 'user/' + id + '.json', editedUser);
  }
}
