import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../../auth/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeString: string;
  timeSent: Date;
  isOwnMessage: boolean;
  ownEmail:string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      if (user) {
        this.ownEmail = user.email;
        this.isOwnMessage = (this.ownEmail === this.userEmail);
      }
      
    })
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeString = chatMessage.timeString;
    this.timeSent = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

}
