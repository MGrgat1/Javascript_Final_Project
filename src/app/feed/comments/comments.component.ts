import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {

  postId = null;
  post = null;
  postSubject = null;
  user = null;
  userSubject = null;
  /*
  post = {
    id : "11",
    title: "Lorem ipsum",
    body: "Lorem",
    timestamp: Date().toString().slice(0, 24),
    userId : "17"
  };
  */

  comments = [];
  commentSubject =null;
  subscription  = null;

  mode : string = '';

  newBody = "";

  errorMessage : string = "";
  newCommentForm!: FormGroup;

  
  isCommentCreationVisible = false;

  constructor(private feedService : FeedService, private auth : AuthService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {



    this.route.params.subscribe( params => {
      console.log("[INFO] Obtained postId from route:" + params.id);
      this.postId = params.id;
    });


    this.auth.authChange
        .subscribe(res => {
          console.log(res);
          if (res) {
            this.user=this.auth.getUser();
          } else {
            this.router.navigate(['login']);
          }
    });

    this.user=this.auth.getUser();

    this.commentSubject=this.feedService.getComments();
    this.subscription=this.commentSubject
        .subscribe(res => {
            console.log("[INFO] Response to subscription in comments.component.ts, GET");
            console.log(res);
            this.comments = this.feedService.getCommentsFromPost(this.postId);
        });

    console.log("[INFO] Entering getPost(postId)");
    this.post = this.feedService.getPost(this.postId);
    console.log("[INFO] Entering getCommentsFromPost(postId)");
    

    this.newCommentForm = new FormGroup({
      'body' : new FormControl(null, [Validators.required])
    });
  

  }
  


  ngOnDestroy() {
    console.log("[INFO] Unsubscribing");
    this.subscription.unsubscribe();
  }


  onStartAdding() {
    console.log("[INFO] Started adding a new comment");
    this.isCommentCreationVisible = true;
  }

  onAdd() {

    let newComment = {
      body: this.newBody,
      timestamp: Date().toString().slice(0, 24),
      userId : this.user.id,
      postId : this.post.id
    };
    console.log("[INFO] Creating new object to be added:");
    console.log(newComment);

    this.feedService.addComment(newComment);

    this.isCommentCreationVisible = false;
    this.newBody = "";
    console.log("[INFO] New comment added. Form reset");
  }


  getBackgroundColor() {
    if(this.newBody.length > 0) 
      return 'green';
    else
      return 'red';
  }

  //counts all the comments except the empty first comment
  getNumberOfComments() {
    return this.comments.length;
  }
}

