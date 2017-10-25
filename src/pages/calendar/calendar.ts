import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayPage } from '../day/day';

import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';



@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  	{
  		provide: CalendarDateFormatter,
  		useClass: CustomDateFormatter
  	}
  ]
})
export class CalendarPage {

	viewDate: any = new Date();

	dayClicked(day): void {
		var str = day.date.getMonth()+1 + '-' + day.date.getDate() + '-' + day.date.getFullYear();
	    this.navCtrl.push(DayPage, str);

	}; 

	constructor(public navCtrl: NavController) {}
	
}


// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
// import { CustomDateFormatter } from './custom-date-formatter.provider';

// @Component({
//   selector: 'mwl-demo-component',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: 'template.html',
//   providers: [
//     {
//       provide: CalendarDateFormatter,
//       useClass: CustomDateFormatter
//     }
//   ]
// })
// export class DemoComponent {
//   view: string = 'month';

//   viewDate: Date = new Date();

//   events: CalendarEvent[] = [];
// }