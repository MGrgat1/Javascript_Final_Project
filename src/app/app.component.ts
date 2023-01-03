import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";
import {User} from "./shared/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth:AuthService, private router:Router){
  }

  ngOnInit(){
      this.auth.whoAmI()
          .subscribe((response:{status:number, user? : User})=>{
            if (response.status==200) {
              console.log(response);
            } else {
              this.router.navigate(['login'])
            }
          }, (err) => {
            console.log(err);
          });
  }



}
