import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";
import {User} from "../shared/user.model";
import { FeedService } from '../feed/feed.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  loggedInUser = null;
  users = [];
  userSubject =null;
  subscription  = null;

  constructor(private userService : UserService, private auth : AuthService, private router:Router) { }

  ngOnInit() {


    console.log("[INFO] Entered ngOnInit() in admin.component.ts");
    
    this.loggedInUser=this.auth.getUser();
    this.auth.authChange
        .subscribe(res => {
          console.log(res);
          if (res) {
            this.loggedInUser=this.auth.getUser();
          } else {
            this.router.navigate(['login']);
          }
    });

    this.getUsers();  

  }

  getUsers(){
    this.userSubject=this.userService.getUsers();
    this.subscription=this.userSubject
        .subscribe(res => {
            console.log("[INFO] Response to subscription in user.component.ts, GET");
            console.log(res);
            this.users=res;

        });
  }

  ngOnDestroy() {
    console.log("[INFO] Unsubscribing");
    this.subscription.unsubscribe();
  }

  deleteUser(id){

    console.log("[INFO] Entered deleteUser() in admin.component.ts, deleting user:");
    console.log(id);
    this.userService.deleteUser(id);
  }

}
