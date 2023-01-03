import {EventEmitter, Injectable} from '@angular/core';
import {User} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators'

@Injectable()
export class AuthService {

  private user : User;
  private token : string;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  //the API_URL variable will be 'localhost:8081' during development, and empty when the app launches
  loginUrl : string = environment.API_URL+'/login';
  registrationUrl : string = environment.API_URL+'/login/register';

  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : {username : string, password: string}){

    console.log("[INFO] Entered auth.service.ts - login()");
    console.log("[INFO] loginUrl:");
    console.log(this.loginUrl);
    console.log("[INFO] Credentials:");
    console.log(credentials);
    //after a successful login, the server will send the user and the token to the client
    this.http.post(this.loginUrl,credentials)
        .subscribe((res : {status : number, description : string, user? : User, token? : string}) => {

          console.log("[INFO] Obtained response from subscription after POST request");
          console.log("[INFO] Result:");
          console.log(res);
          if (res.status == 200){
            this.user=res.user;
            this.token=res.token;
            localStorage.setItem('token', this.token);            //the token will be stored in the local storage and used in every subsequent AJAX request
            this.authChange.next(true);
            this.router.navigate(['/']);                          //after a successful login in go to the root directory
          } else {
            this.errorEmitter.next(res.description)
          }
        })

  }

  //remove the user and the token and go back to the login page
  logout(){

    console.log("[INFO] Entered auth.service.ts - logout()");
    this.user=null;
    this.token=null;
    localStorage.removeItem('token');                     
    this.authChange.next(false);
    this.router.navigate(['login']);
  }

  register(newUser : {username : string, password : string, name : string, email : string}) {

    console.log("[INFO] Entered auth.service.ts - register()");
    console.log("[INFO] User to be sent over POST:");
    console.log(newUser);
    this.http.post(this.registrationUrl, newUser)
    .subscribe((res : {status : number, description : string, user? : User, token? : string}) => {

      console.log("[INFO] Received response to POST request. Result:");
      console.log(res);

      //after a successful registration the client should be logged in
      if (res.status == 200){

        console.log("[INFO] Registration was successful. Proceeding to login");
        let loginCredentials = {
          username : newUser.username,
          password : newUser.password
        }

        console.log("[INFO] Entering login of registered user. Credentials:");
        this.login(loginCredentials);

      } else {
        this.errorEmitter.next(res.description);
      }
    });
  }

  getUser(){
    if (this.user)
    return {...this.user}; else return null;
  }

  getToken(){
    console.log("[INFO] Entered getToken()")
    if (this.token) {
      console.log("[INFO] Token is here");
      return this.token;   
    } else {
      console.log("[INFO] Token is not here. Checking local storage");
      if (localStorage.getItem('token')){
        console.log("[INFO] Token is in local storage");
        this.token=localStorage.getItem('token');
        return this.token;
      }

    }

  }

  isAuthenticated(){
    return this.user!=null;
  }

  whoAmI(){
    console.log("[INFO] Entered whoAmI()");
    if (this.getToken()) {
      console.log("[INFO] Token detected. Sending GET request to API to get user information")
      return this.http.get(environment.API_URL + '/api/me')
          .pipe(map((response: { status: number, user?: User }) => {
            if (response.status == 200) {
              this.user = response.user;
              this.authChange.next(true);
            }
            return response;
          }))

    } else {
      return new Observable(observer => {
        observer.next({status:100})
      })
    }

  }

}
