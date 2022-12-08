import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpNewUser } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(public route: ActivatedRoute,private router: Router, private authService: AuthService, private notifyService : NotificationService) { }
  signUpForm!: FormGroup;
  today_date: string = "";
  user_id: string = "";
  user: any = {};
  
  ngOnInit(): void {
    this.initializeForm();
    this.today_date = new Date().toLocaleDateString('en-CA');
    this.route.params.subscribe((qParams: any) => {
      console.log(qParams);
      
      this.user_id = qParams.id;

    });
    this.authService.getUser(this.user_id).subscribe(res => this.user = res);
  }

  initializeForm() {
    console.log(this.user);
    
    this.signUpForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      date: new FormControl(this.user.date, Validators.required),
      // password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}$")]),
      // confirm_password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")])
    })
  }
  onSubmit() {
    
    const newUser: any = {
      name: this.signUpForm.value.name || this.user.name,
      email: this.signUpForm.value.email || this.user.email,
      date: this.signUpForm.value.date || this.user.date,
      // password: this.signUpForm.value.password,
      // confirm_password: this.signUpForm.value.confirm_password,
      returnSecureToken: true
    }
    this.authService.editUser(newUser, this.user_id).subscribe(response => {      
      if(response)
      {
        this.notifyService.showSuccess("Saved Successfully !!", "Success")
        this.router.navigateByUrl('admin/users');
      }
      else{
        this.notifyService.showError("Something is wrong", "Error")
      }
    });
  }
  

}
