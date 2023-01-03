import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes : Route[] = [
  {path:'',component: InboxComponent},
  {path:':id',component: SendMessageComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }

