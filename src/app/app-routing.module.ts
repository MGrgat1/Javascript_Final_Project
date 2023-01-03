import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import {AuthenticationGuard} from "./auth.guard";
import {AdminComponent} from "./admin/admin.component";
import { AdminGuard } from './admin.guard';
import { FeedModule } from './feed/feed.module';
import { ProfileComponent } from './profile/profile.component';
import { MessagesModule } from './messages/messages.module';

const routes : Route[] = [
    {path:'',loadChildren: () => FeedModule, canActivate:[AuthenticationGuard]},
    {path:'login',loadChildren: () => AuthModule},
    {path:'profile/:id',component:ProfileComponent, canActivate:[AuthenticationGuard]},
    {path:'admin',component:AdminComponent, canActivate:[AdminGuard]},
    {path:'messages', loadChildren: () => MessagesModule, canActivate:[AuthenticationGuard]}

];
// ovo tsconfig : esnext
@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
