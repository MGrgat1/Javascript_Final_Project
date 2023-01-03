import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';



@NgModule({
  declarations: [
    InboxComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
