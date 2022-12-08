import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignUpNewUser } from '../../model/user.model';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm!: FormGroup;
  color: string = "primary";
  label: string = "Sign Up";
  today_date: string = "";

  constructor(private authService: AuthService, private router: Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.today_date = new Date().toLocaleDateString('en-CA');
  }

  initializeForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      date: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}$")]),
      confirm_password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")])
    })
  }


  validatingForm(controlName1: string, controlName2: string) {
    return (formGroup: FormGroup) => {
      const controlValue1 = formGroup.controls[controlName1];
      const controlValue2 = formGroup.controls[controlName2];
      if (controlValue2.errors) {
        return;
      }

      if (controlValue1.value !== controlValue2.value) {
        controlValue2.setErrors({ validatingForm: true })
      } else {
        controlValue2.setErrors(null)
      }
    }
  }

  onSubmit() {
    const newUser: SignUpNewUser = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      date: this.signUpForm.value.date,
      password: this.signUpForm.value.password,
      confirm_password: this.signUpForm.value.confirm_password,
      returnSecureToken: true
    }
    console.log(newUser);
    this.authService.signUp(newUser).subscribe(response => {
      if(response.idToken)
      {
        this.router.navigateByUrl('login');
        this.notifyService.showSuccess("Register successfully !!", "Success")
        this.authService.storeUser(newUser).subscribe(res => console.log(res));
      }
      else{
        this.router.navigateByUrl('register');
        this.notifyService.showError("Something is wrong", "Error")
      }
    });
  }
}
