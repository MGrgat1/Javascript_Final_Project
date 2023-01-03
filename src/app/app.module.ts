import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {AuthService} from "./shared/auth.service";
import {AuthenticationGuard} from "./auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./auth/auth.interceptor";
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthenticationGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
