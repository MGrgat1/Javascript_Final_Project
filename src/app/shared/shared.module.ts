import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from '../auth/login/login.component';



@NgModule({
  declarations: [NavbarComponent, HighlightDirective],
  imports: [
    CommonModule, FormsModule, RouterModule, ReactiveFormsModule
  ],
    exports: [NavbarComponent, CommonModule, HighlightDirective]
})
export class SharedModule { }
