import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:User;
  authenticated=false;
  authChangeSubscription : Subscription;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
     this.authenticated=this.auth.isAuthenticated();

     this.authChangeSubscription=this.auth.authChange
         .subscribe(res => {
           this.authenticated=this.auth.isAuthenticated();
         });
  }

  getClass(a){

    return this.router.url==a ? 'active' : '';

  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.authChangeSubscription.unsubscribe();
  }

}
