import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayPage } from '../day/day';



@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

	viewDate: any = new Date();

	dayClicked(day): void {
		var str = day.date.getMonth()+1 + '-' + day.date.getDate() + '-' + day.date.getFullYear();
	    this.navCtrl.push(DayPage, str);

	}; 

	constructor(public navCtrl: NavController) {}
	
}
