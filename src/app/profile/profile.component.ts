import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { FeedService } from '../feed/feed.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId = null;
  loggedInUser = null;
  selectedUser = null;
  accountActive = true;

  posts = [];
  userSubject : any = new BehaviorSubject(null);
  userSubscription : any = null;
  postSubject : any = new BehaviorSubject(null);
  postSubscription : any = null;

  indexOfEditedPost = -1;
  editedTitle = "";
  editedBody = "";

  constructor( private auth: AuthService, private userService: UserService, private feedService: FeedService, private route: ActivatedRoute, private router : Router ) { }

  ngOnInit() {
    


    this.route.params.subscribe( params => {
      console.log("[INFO] Route parameter:");
      console.log(params);
      this.userId = params.id;
    });

    this.loggedInUser=this.auth.getUser();
      if(this.loggedInUser == null) {
        this.router.navigate(['login']);
    }
    this.auth.authChange
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.loggedInUser=this.auth.getUser();
        } else {
          this.router.navigate(['login']);
        }
    });

    console.log("[INFO] in profile.component.ts, entered ngOnInit()");
      
    //find selected user by id
    console.log("[INFO] Entering getUser(id)");
    this.selectedUser = this.userService.getUser(this.userId);
    if(!this.selectedUser) {
      this.accountActive = false;
    }

    console.log("[INFO] Entering getPostsByUser(id)");
    //getting all the user's posts from the database
    this.posts = this.feedService.getPostsByUser(this.userId);
  }
    


  onDelete(i: any) {
    //this.posts.splice(i, 1);

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
      userId : this.loggedInUser.id
    };
    console.log("[INFO] Edited post:");
    console.log(postToBeEdited);

    this.feedService.editPost(postToBeEdited);
    this.resetEditor(i);
  }


  resetEditor(i) {
    this.indexOfEditedPost = -1;
    this.editedTitle = "";
    this.editedBody = "";
  }

  
}
