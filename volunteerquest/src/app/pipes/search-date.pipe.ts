import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'searchDatePipe'
})
export class SearchDatePipe implements PipeTransform {
  transform(events: Observable<any>, startDate: Date, endDate: Date): Observable<any> {
    console.log("In search date pipe.");
    if(!startDate || !endDate) {
        return events;
    }
    return events.map(event_arr => 
      event_arr.filter(event => 
        event.date.getTime() >= startDate.getTime() && event.date.getTime() <= endDate.getTime()
      )
    )
  }
}
