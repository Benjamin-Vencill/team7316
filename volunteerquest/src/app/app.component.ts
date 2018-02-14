import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MessagingService } from './app-chat/messaging.service';

@Component({
  selector: 'app-root',
  providers: [MapComponent, MessagingService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { }