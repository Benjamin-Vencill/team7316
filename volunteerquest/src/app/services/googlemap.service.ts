import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';

declare var google: any;

@Injectable()
export class GooglemapService extends GoogleMapsAPIWrapper {
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
      super(__loader, __zone);
    }

  getGeocoding(address: string) {
      console.log('Getting Address:', address);
      return Observable.create(observer => {
          try {
              // The variable google may still be undefined (google maps scripts
              // still loading), so allow time to load the scripts
              this.__loader.load().then(() => {
                  let geocoder = new google.maps.Geocoder();
                  geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log("results from google maps is:", JSON.stringify(results));
                        observer.next(results[0].geometry.location);
                        observer.complete();
                    } else {
                        console.log('Error:', results, ' & Status:', status);
                        observer.next({});
                        observer.complete();
                    }
                });
              })
          } catch(error) {
              observer.error('error in getGeocoding:', error);
              observer.complete();
          }
      });
  }
}