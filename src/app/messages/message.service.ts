import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages = [];
  messageSubject  = new BehaviorSubject(null);


  constructor(private dataService:DataService) {
      this.init();
  }

  init(){

    this.dataService.getMessages()
        .subscribe((res : {status:string, messages}) => {
            console.log("[INFO] Response to subscription in messageService, messages:");
            console.log(res);
            this.messages=res.messages;
            this.messageSubject.next(this.messages);
        });

  }

  getMessages(){
    return this.messageSubject;

  }


  getMessagesToUser(id) {
    console.log("[INFO] Entered getMessagesToUser(id)");
    let messagesToUser = [];
    for(let message in this.messages){
      if(this.messages[message].recipientId == id) {
        console.log("[INFO] Message found");
        messagesToUser.push(this.messages[message]);
      }
    }
    return messagesToUser;
  }

  sendMessage(message){
    this.dataService.sendMessage(message)
        .subscribe((res => {
          console.log("[INFO] Response to subscription in userService, sendMessage:");
            console.log(res);
            this.messages.push(message);
            this.messageSubject.next(this.messages);
        }));
  }

  deleteMessage(id){
      this.dataService.deleteMessage(id)
          .subscribe((res => {
              console.log(res);
              this.messages=this.messages.filter(c => c.id!=id);
              this.messageSubject.next(this.messages);
          }));
  }
  
  /*
  editMessage(message){
      this.dataService.editMessage(message)
          .subscribe((res => {
              console.log("[INFO] Obtained response to edit operation:");
              console.log(res);
              this.messages[this.messages.findIndex(c => c.id==message.id)]=message;
              this.messageSubject.next(this.messages);
          }),error => {
              console.log(error);
          });
     }
     */

}
