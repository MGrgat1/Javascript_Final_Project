import { NgModule } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { Route, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';

const routes : Route[] = [
  {path:'',component: PostsComponent},
  {path:'comments/:id',component: CommentsComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
