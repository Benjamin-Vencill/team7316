import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'searchCategoryPipe'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(events: Observable<any>, categories: string[]): Observable<any> {
    // console.log("events:", events);
    if(!categories) {
      // console.log("events are:", events);
      return events;
    }
    return events.map(event_arr => 
      event_arr.filter(event =>
        categories.includes(event.category.toLowerCase()))
    );
  }
}
