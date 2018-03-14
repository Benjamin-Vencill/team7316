import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/user';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[];

  constructor(chat: ChatService) {
    chat.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }
}