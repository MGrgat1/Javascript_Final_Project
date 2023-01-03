import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {


  posts = [];
  comments = [];
  postSubject  = new BehaviorSubject(null);
  commentSubject  = new BehaviorSubject(null);


  constructor(private http:HttpClient, private dataService:DataService) {
      this.init();
  }

  init(){

    console.log("[INFO] Entered init() in feed.service.ts");
    console.log("[INFO] Calling dataService.getPosts() in feed.service.ts");
    this.dataService.getPosts()
        .subscribe((res : {status:string, posts}) => {
            console.log("[INFO] Response to subscription in feedService");
            console.log(res.posts);
            this.posts=res.posts;
            this.postSubject.next(this.posts);
        });

    this.dataService.getComments()
    .subscribe((res : {status:string, comments}) => {
        console.log("[INFO] Response to subscription in feedService");
        console.log(res.comments);
        this.comments=res.comments;
        console.log(res);
        this.commentSubject.next(this.comments);
    });
    
  }

  getPosts(){
    console.log("[INFO] Entered getPosts() in feed.service.ts, GET"); 
    return this.postSubject;

  }

  getPost(postId){
    console.log("[INFO] Entered getPost(postId)");
    for(let post in this.posts){
      if(this.posts[post].id == postId) {
        console.log("[INFO] Post found:");
        console.log(this.posts[post]);
        return this.posts[post];
      }
    }
    return null;
  }

  getCommentsFromPost(postId){
    console.log("[INFO] Entered getCommentsFromPost(postId)");
    let selectedComments = [];
    for(let comment in this.comments){
      if(this.comments[comment].postId == postId) {
        selectedComments.push(this.comments[comment]);
      }
    }
    return selectedComments;
  }

  getPostsByUser(id) {
    console.log("[INFO] Entered getPostsByUser(id)");
    let selectedPosts = [];
    for(let post in this.posts){
      if(this.posts[post].userId == id) {
        console.log("[INFO] Post found");
        selectedPosts.push(this.posts[post]);
      }
    }
    return selectedPosts;
  }

  getComments(){
    console.log("[INFO] Entered getComments() in feed.service.ts, GET"); 
    return this.commentSubject;

  }

  addPost(post){
    this.dataService.addPost(post)
        .subscribe((res => {
            console.log(res);
            console.log("[INFO] Response to subscription in feedService, POST");
            console.log(res);
            //place the new post on top
            this.posts.reverse();
            this.posts.push(post);
            this.posts.reverse();
            this.postSubject.next(this.posts);

            //getting the posts again solved the new post problem (now we can enter the comment section of a new post without it breaking) 
            this.dataService.getPosts()
            .subscribe((res : {status:string, posts}) => {
                console.log("[INFO] Response to subscription in feedService");
                console.log(res.posts);
                this.posts=res.posts;
                this.postSubject.next(this.posts);
            });
        }));
  }

  addComment(comment){
    this.dataService.addComment(comment)
        .subscribe((res => {
            console.log("[INFO] Response to subscription in feedService, POST");
            console.log(res);
            this.comments.push(comment);
            this.commentSubject.next(this.comments);
        }));
  }

  deletePost(id){
      this.dataService.deletePost(id)
          .subscribe((res => {
            console.log("[INFO] Response to subscription in feedService, DELETE");
            console.log(res);
            this.posts=this.posts.filter(post => post.id!=id);
            this.postSubject.next(this.posts);
          }));
  }

  editPost(post){
      this.dataService.editPost(post)
          .subscribe((res => {
            console.log("[INFO] Response to subscription in feedService, EDIT");
            console.log(res);
              this.posts[this.posts.findIndex(c => c.id==post.id)]=post;
              this.postSubject.next(this.posts);
          }),error => {
              console.log(error);
          });
     }

}
