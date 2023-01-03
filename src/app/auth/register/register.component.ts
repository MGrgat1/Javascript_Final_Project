import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage : string = "";
  registerForm!: FormGroup;

  username = "";
  password = "";
  name = "";
  email = "";
  constructor(private authService : AuthService, private userService : UserService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password' : new FormControl(null, [Validators.required]),
      'name' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required])
    });

    this.authService.errorEmitter
        .subscribe((error : string) => {
          this.errorMessage = error;
        });

  }

  /**
   * Create a POST request with the new user in the header, and then login with the new user's credentials.
   * After a succesful login the client will be redirected to the main page
   */
  onRegister(){

    console.log("[INFO] Entering onRegister()");

    console.log("[INFO] User to be registered:");
    console.log(this.registerForm.value);

    //component 'shared' - user.service.ts
    this.authService.register(this.registerForm.value);

    this.username = "";
    this.password = "";
    this.name = "";
    this.email = "";

    console.log("[INFO] Registration reset");


  }

}
