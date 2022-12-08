import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInUser } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}$")]),
    })
  }

  onSubmit() {
    const user: SignInUser = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      returnSecureToken: true
    }

    console.log(user);

    this.authService.signIn(user).subscribe(userResponse => {
      console.log("Signed In User", userResponse);
      if(userResponse.email === "admin@gmail.com")
      {
        userResponse = {...userResponse, role: 'admin'}
      }
      else{
        userResponse = {...userResponse, role: 'user'}
      }
      this.authService.userSubject.next(userResponse);
      this.authService.user = userResponse;
      localStorage.setItem("user_token", JSON.stringify(this.authService.user));
      
      if (userResponse.idToken && userResponse.email === "admin@gmail.com") {
        console.log(userResponse.email);
        this.router.navigateByUrl('/admin');
        this.authService.checkRole(); 
        this.authService.isAdmin = true;
        console.log(this.authService.isAdmin);
        
        this.notifyService.showSuccess("Admin Login successfully !!", "Success");
      }
      else if(userResponse.idToken && userResponse.email !== "admin@gmail.com"){
        console.log(userResponse.email);
        this.router.navigateByUrl('');
        this.authService.checkRole(); 
        this.notifyService.showSuccess("Login successfully !!", "Success")
      }
      else {
        this.router.navigateByUrl('login');
        this.notifyService.showError("Something is wrong", "Error")
      }
      
    })
  }
}
