import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { FeedRoutingModule } from './feed-routing.module';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './comments/comments.component';
import { ProfileComponent } from '../profile/profile.component';
import { SortingPipe } from './sorting.pipe';
import { FilterPipe } from './filter.pipe';




@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent,
    ProfileComponent,
    SortingPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FormsModule
  ]
})
export class FeedModule { }
