import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http:HttpClient) { }

  apiRootUsers = environment.API_URL + '/api/users';
  apiRootPosts = environment.API_URL + '/api/posts';
  apiRootComments = environment.API_URL + '/api/comments';
  apiRootMessages = environment.API_URL + '/api/messages';

  getUsers(){
    return this.http.get(this.apiRootUsers);
  }

  getPosts(){
    return this.http.get(this.apiRootPosts);
  }

  getComments(){
    return this.http.get(this.apiRootComments);

  }

  getMessages(){
    return this.http.get(this.apiRootMessages);
  }

  addUser(user){
    return this.http.post(this.apiRootUsers, user);
  }

  addPost(post){
    return this.http.post(this.apiRootPosts, post);

  }

  addComment(comment){
    return this.http.post(this.apiRootComments, comment);

  }

  sendMessage(message){
    return this.http.post(this.apiRootMessages, message);
  }

  deleteUser(id){
    console.log("Entering deleteUser() in user.service.ts, deleting user:");
    console.log(id);
    return this.http.delete(this.apiRootUsers+`/${id}`);
  }

  deletePost(id){
    return this.http.delete(this.apiRootPosts+`/${id}`);
  }

  deleteMessage(id){
    return this.http.delete(this.apiRootMessages+`/${id}`);
  }
  
  editPost(post){
    return this.http.put(this.apiRootPosts, post);
  }



}
