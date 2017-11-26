import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app';
  lat: number = 33.7490;
  lng: number = -84.3880;
  zoom: number = 10;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers: marker[] = [
    {
      lat: 33.7490,
      lng: -84.2990,
      label: "Animal Shelter Event"
    },
    {
      lat: 33.8130,
      lng: -84.3920,
      label: "After School Tutoring"
    }
  ]
}

interface marker {
  lat: number;
  lng: number;
  label?: string; // '?' makes this parameter optional
}