import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  loggedInUser = null;
  selectedUser = null;
  users = [];
  userSubject : any = new BehaviorSubject(null);

  messages = [];
  messageSubject = new BehaviorSubject(null);
  subscription = null;

  indexOfEditedmessage = -1;
  editedTitle = "";
  editedBody = "";

  constructor( private auth: AuthService, private userService: UserService, private messageService : MessageService, private route: ActivatedRoute, private router : Router ) { }

  ngOnInit() {
    
    this.loggedInUser=this.auth.getUser();
      if(this.loggedInUser == null) {
        this.router.navigate(['login']);
    }
    this.auth.authChange
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.loggedInUser=this.auth.getUser();
        } else {
          this.router.navigate(['login']);
        }
    });

    this.messageSubject=this.messageService.getMessages();
    this.subscription=this.messageSubject
        .subscribe(res => {
            console.log("[INFO] Response to subscription in inbox.component.ts, GET");
            console.log(res);
            
            console.log("[INFO] Entering getMessagesToUser(id)");
            //getting all the user's posts from the database
            this.messages = this.messageService.getMessagesToUser(this.loggedInUser.id);
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
    this.subscription.unsubscribe();
  }

  onDelete(i: any) {
    //this.messages.splice(i, 1);

    let messageToBeDeleted = this.messages[i];
    console.log("[INFO] message to be deleted:");
    console.log(messageToBeDeleted);  
    console.log("[INFO] message to be deleted, id:");
    console.log(messageToBeDeleted.id);
    this.messageService.deleteMessage(messageToBeDeleted.id);
  }

  
}
