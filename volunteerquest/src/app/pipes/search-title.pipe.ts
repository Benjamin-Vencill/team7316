import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'searchTitlePipe'
})
export class SearchTitlePipe implements PipeTransform {

  transform(events: Observable<any>, title_terms: string): Observable<any> {
    if(!title_terms) return events;
    return events.map(event_arr => 
      event_arr.filter(event => 
        event.title.toLowerCase().includes(title_terms.toLowerCase())));

    
  }

}
