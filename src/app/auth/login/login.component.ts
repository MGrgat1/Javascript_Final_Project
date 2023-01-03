import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage : string = null;
  signinForm : FormGroup;

  constructor(private auth : AuthService) { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    this.auth.errorEmitter
        .subscribe((error : string) => {
          this.errorMessage = error;
        });

  }

  onLogin(){

    /* This method is found in auth.service.ts
     * its signature looks like this: 
     * login(credentials : {username : string, password: string})
    */

    console.log("[INFO] Entered onLogin()");
    console.log("[INFO] The value of the signinForm:");
    console.log(this.signinForm.value);
    this.auth.login(this.signinForm.value);

  }

}
