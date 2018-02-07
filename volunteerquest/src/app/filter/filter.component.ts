import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material';
// import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  // class property
  currentFilter : {};
  constructor(private route: ActivatedRoute) { }

  routingSubscription: any;

  ngOnInit() {
    // this.routingSubscription = this.route.params.subscribe(urlParams => {
    //   console.log(urlParams["id"]);
      
    // });
  }

  ngOnDestroy() {
    // this.routingSubscription.unsubscribe();
  }

}
