import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { Observable } from 'rxjs/Observable';
import { Post } from './post';

@Component({
  selector: 'editpostview',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})


export class EditPostComponent implements OnInit {


  postRef: AngularFirestoreDocument<any>;
  post: Observable<any>;

  user: User;

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {
    this.postRef = this.afs.doc('posts/myTestPost');
    this.post = this.postRef.valueChanges();

    this.auth.user.subscribe(user => this.user = user);
  }

  createPost() {
    if (this.auth.canEdit(this.user)) {
      const new_post: Post = {
        title: 'Wow New Post!',
        content: 'This is some classic content!'
      } 
      this.postRef.set(new_post, {merge: true})
    }
  }

  editPost() {
    if (this.auth.canEdit(this.user)) {
      this.postRef.update({
        title: 'Edited Title!'
      })
  }
  }

  deletePost() {
    this.postRef.delete()
  }

}
