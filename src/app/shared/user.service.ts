import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [];
  userSubject  = new BehaviorSubject(null);

  constructor(private http:HttpClient, private dataService:DataService) { 
    this.init();
  }



  init(){

    console.log("[INFO] Entered init() in user.service.ts");
    console.log("[INFO] Calling dataService.getUsers() in user.service.ts");
    this.dataService.getUsers()
        .subscribe((res : {status:string, users}) => {
            console.log("[INFO] Response to subscription in userService");
            console.log(res.users);
            this.users=res.users;
            this.userSubject.next(this.users);
        });

  }

  reloadUsers() {
    console.log("[INFO] Reloading users");
    this.dataService.getUsers()
        .subscribe((res : {status:string, users}) => {
            console.log("[INFO] Response to subscription in userService, GET");
            console.log(res.users);
            this.users=res.users;
            this.userSubject.next(this.users);
        });
  }


  getUsers(){
    console.log("[INFO] Entered getUsers() in user.service.ts, GET"); 
    return this.userSubject;
  }

  getUser(id) {
    console.log("[INFO]Entered getUser(id)");
    for(let user in this.users){
      if(this.users[user].id == id) {
        console.log("[INFO] User found");
        return this.users[user];
      }
    }
    return null;
  }

  adduser(user){
    this.dataService.addUser(user)
        .subscribe((res => {
            console.log(res);
            console.log("[INFO] Response to subscription in userService, user");
            console.log(res);
            this.users.push(user);
            this.userSubject.next(this.users);

            //trying to solve the new user problem
            this.reloadUsers();
        }));
  }

  deleteUser(id){
    this.dataService.deleteUser(id)
        .subscribe((res => {
          console.log("[INFO] Response to subscription in userService, DELETE");
          console.log(res);
          this.users=this.users.filter(c => c.id!=id);
          this.userSubject.next(this.users);
        }));
}


}
