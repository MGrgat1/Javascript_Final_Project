import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  loggedInUser = null;
  messageSubject : any = new BehaviorSubject(null);
  messageSubscription : any = null;

  newSubject = "";
  newBody = "";

  recipientId = "";

  messageSent = false;

  constructor( private auth: AuthService, private userService: UserService, private messageService: MessageService,  private route: ActivatedRoute,  private router : Router ) { }

  ngOnInit() {
    

    this.route.params.subscribe( params => {
      console.log("[INFO] Route parameter:");
      console.log(params);
      this.recipientId = params.id;
    });

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

    
  }
 

  onSend() {
    let messageToBeSent = {
      subject: this.newSubject,
      body: this.newBody,
      timestamp: Date().toString().slice(0, 24),
      senderId : this.loggedInUser.id,
      recipientId : this.recipientId
    };
    console.log("[INFO] Message to be sent:");
    console.log(messageToBeSent);

    this.messageService.sendMessage(messageToBeSent);

    this.resetEditor();
  }


  resetEditor() {
    this.newSubject = "";
    this.newBody = "";
    this.messageSent = true;
  }

  

  getBackgroundColor() {
    if(this.newBody.length > 0) 
      return 'green';
    else
      return 'red';
  }
  
}
