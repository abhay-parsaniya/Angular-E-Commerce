import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users:any;
  constructor(private authService: AuthService,private router: Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onEditUser(id:string){
    console.log(id)
    this.router.navigate(['/admin/users', id], {queryParamsHandling: 'preserve'});
  } 
  onDeleteUser(id:string){
    console.log(id)
    // this.authService.deleteProduct(id).subscribe(res => {
    //   this.notifyService.showSuccess("Deleted successfully !!", "Success")
    //   this.getUsers();
    // });
  }
  getUsers() {
    this.authService.getAllUsers().subscribe(res => {
      this.users = Object.keys(res).map((key: any) => {
        res[key] = { ...res[key], id: key }

        return res[key];
      });
      console.log(this.users)
    })
  }
}
