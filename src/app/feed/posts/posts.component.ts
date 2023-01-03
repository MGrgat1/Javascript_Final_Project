import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  query='';
  user = null;

  posts = null;
  postSubject =null;
  subscription  = null;

  mode : string = '';

  newTitle = "";
  newBody = "";

  indexOfEditedPost = -1;
  editedTitle = "";
  editedBody = "";

  usernames = [];

  errorMessage : string = "";
  newPostForm!: FormGroup;

  
  isCommentCreationVisible = false;

  constructor(private feedService : FeedService, private userService : UserService, private auth : AuthService, private router:Router) { }

  ngOnInit() {


    console.log("[INFO] Entered ngOnInit() in posts.component.ts");
    
    this.user=this.auth.getUser();
    this.auth.authChange
        .subscribe(res => {
          console.log(res);
          if (res) {
            this.user=this.auth.getUser();
          } else {
            this.router.navigate(['login']);
          }
    });

    this.getPosts();

    this.newPostForm = new FormGroup({
      'title' : new FormControl(null, [Validators.required]),
      'body' : new FormControl(null, [Validators.required])
    });
  

  }

  getPosts(){
    this.postSubject=this.feedService.getPosts();
    this.subscription=this.postSubject
        .subscribe(res => {
            console.log("[INFO] Response to subscription in post.component.ts, GET");
            console.log(res);
            this.posts=res;
        });
  }

  ngOnDestroy() {
    console.log("[INFO] Unsubscribing");
    this.subscription.unsubscribe();
  }


  onStartAdding() {
    this.isCommentCreationVisible = true;
  }

  addPost() {

    let newPost = {
      title: this.newTitle,
      body: this.newBody,
      timestamp: Date().toString().slice(0, 24),
      userId : this.user.id
    };
    console.log("[INFO] Creating new object to be added:");
    console.log(newPost);

    this.feedService.addPost(newPost);

    this.isCommentCreationVisible = false;
    this.newTitle = "";
    this.newBody = "";
    console.log("[INFO] New post added.");
  }

  getBackgroundColor() {
    if(this.newBody.length > 0) 
      return 'green';
    else
      return 'red';
  }

    

  onDelete(i: any) {
    //this.posts.splice(i, 1);
    console.log("i:");
    console.log(i);  
    let postToBeDeleted = this.posts[i];
    console.log("[INFO] Post to be deleted:");
    console.log(postToBeDeleted);  
    console.log("[INFO] Post to be deleted, id:");
    console.log(postToBeDeleted.id);
    this.feedService.deletePost(postToBeDeleted.id);
  }

  onEdit(i: any) {

    this.indexOfEditedPost = i;
    this.editedTitle = this.posts[i].title;
    this.editedBody = this.posts[i].body;


  }

  onDoneEditing(i: any) {

    console.log("[INFO] Done editing post");
    let postToBeEdited = {
      id : this.posts[i].id,
      title: this.editedTitle,
      body: this.editedBody,
      timestamp: Date().toString().slice(0, 24),
      userId : this.user.id
    };
    console.log("[INFO] Edited post:");
    console.log(postToBeEdited);

    this.feedService.editPost(postToBeEdited);

    this.getPosts();
    this.resetEditor(i);
  }


  resetEditor(i) {
    this.indexOfEditedPost = -1;
    this.editedTitle = "";
    this.editedBody = "";
  }

}
