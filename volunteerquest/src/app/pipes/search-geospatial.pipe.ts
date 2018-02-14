import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Coordinate, BBox } from './geometry.model';



@Pipe({
  name: 'searchGeospatialPipe'
})

export class SearchGeospatialPipe implements PipeTransform {

  transform(events: Observable<any>, lat_term: number, lng_term: number, radius_term: number): Observable<any> {
    //TODO: Replace lat_term and lng_term with address translation service
    
    if(!lat_term || !lng_term || !radius_term) {
        return events;
    } 

    //var center: Coordinate = this.getCoordinate(addr_terms);
    var center: Coordinate = {lat: Number(lat_term), lng: Number(lng_term)}
    var bbox: BBox = this.getBoundingBox(center, Number(radius_term));

    //this.boxTestPrintout(bbox, center);

    return events.map(event_arr => 
      event_arr.filter(event => 
        //this.boxTestPrintout(bbox, {lat:event.lat, lng:event.lng})));
        this.isWithinBox({lat: event.lat, lng:event.lng} , bbox)));

    
  }

  boxTestPrintout(bbox: BBox, coordinate: Coordinate) {
    console.log("Check EAST:", bbox.east, "should be less than", coordinate.lat);
    console.log(bbox.east < coordinate.lat);

    console.log("Check WEST:", bbox.west, "should be greater than", coordinate.lat);
    console.log(bbox.west > coordinate.lat);

    console.log("Check SOUTH:", bbox.south, "should be less than", coordinate.lng);
    console.log(bbox.south > coordinate.lng);

    console.log("Check NORTH:", bbox.north, "should be greater than", coordinate.lng);
    console.log(bbox.north < coordinate.lng);
  }

  isWithinBox(coordinate: Coordinate, box: BBox) {
      if (     (box.east < coordinate.lat)
            && (box.west > coordinate.lat)
            && (box.south > coordinate.lng)
            && (box.north < coordinate.lng) ){
                console.log("IN BOX TRUE");
            return true;
        } else {
            return false;
        }
  }

  getCoordinate(address) {
      //TODO: Hit service for address to return coordinate object
      return address
  }

  getBoundingBox(coordinate: Coordinate, radius_in_miles) {
      //returns a BBox (two pairs of coordinates) that defines a rectagle centered at coordinate
      //and with length and width 2*radius (radius in miles)
      var lat_rad = this.degToRad(coordinate.lat)
      var lng_rad = this.degToRad(coordinate.lng)
    
      var radius_in_km = radius_in_miles * 1.60934
      var box_radius = radius_in_km * 1000

      var earth_radius = this.wgs84EarthRadius(coordinate.lat)
      var parallel_radius = earth_radius * Math.cos(coordinate.lat)

      var latMin = this.radToDeg(lat_rad - box_radius/earth_radius)
      var latMax = this.radToDeg(lat_rad + box_radius/earth_radius)
      var lngMin = this.radToDeg(lng_rad - box_radius/parallel_radius)
      var lngMax = this.radToDeg(lng_rad + box_radius/parallel_radius)

      var topleft: Coordinate = {lat: latMax, lng: lngMax};
      var botright: Coordinate = {lat:latMin, lng: lngMin};

      var box: BBox = {north: lngMax, south: lngMin, east:latMin, west:latMax}
      console.log("BBOX:", box);
      
      return box
  }

  degToRad(deg) {
      return Math.PI*deg/180.0
  } 

  radToDeg(rad) {
      return 180.0*rad/Math.PI
  }

  wgs84EarthRadius(lat) {
    //returns the radius of the earth at a given latitude
    //Reference: http://en.wikipedia.org/wiki/Earth_radius
    // Semi-axes of WGS-84 geoidal reference
    var WGS84_a = 6378137.0;  // Major semiaxis
    var WGS84_b = 6356752.3;  // Minor semiaxis

    var An = WGS84_a*WGS84_a * Math.cos(lat)
    var Bn = WGS84_b*WGS84_b * Math.sin(lat)
    var Ad = WGS84_a * Math.cos(lat)
    var Bd = WGS84_b * Math.sin(lat)
      return Math.sqrt( (An*An + Bn*Bn)/(Ad*Ad + Bd*Bd) )
  }



}

