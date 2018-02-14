import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'searchCategoryPipe'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(events: Observable<any>, cat_terms: string): Observable<any> {
    if(!cat_terms) return events;
    return events.map(event_arr => 
        event_arr.filter(event => 
        event.category.toLowerCase().includes(cat_terms.toLowerCase())));

    
  }

}
