import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayPage } from '../day/day';

import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewDay  } from 'angular-calendar';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Auth } from '../../providers/auth.provider';
import { Observable } from 'rxjs/Rx';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

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

  events$: Observable<Array<CalendarEvent>>;
  eventsDB: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, public db: AngularFireDatabase, public auth: Auth) {
    this.eventsDB = db.list('/' + this.auth.user.userId + '/events');
    //can't console log this.events here because of async
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fakeSwitchCalendar(): void {
    this.eventsDB = this.db.list('/fake/events');
    this.fetchEvents();
  }

  fetchEvents(): void {
    // this.events = [];
    // this.eventsDB.subscribe(events=>{
    //   events.forEach(node => {
    //     //console.log(node);
    //     var cEvent: CalendarEvent = {
    //       title: node.title,
    //       color: colors.blue,
    //       start: new Date(node.date),
    //       meta: {
    //        incrementsBadgeTotal: true,
    //        description: node.details,
    //        type: node.type
    //       }
    //     }
    //     this.events.push(cEvent);
    //   })
    //   //console.log(this.events);
    // });

    // this.notesDB.subscribe(events=>{
    //   events.forEach(node => {
    //     //console.log(node);
    //     var cNote: CalendarEvent = {
    //       title: node.title,
    //       color: colors.yellow,
    //       start: new Date(node.date),
    //       meta: {
    //        incrementsBadgeTotal: true,
    //        description: node.details,
    //       }
    //     }
    //     this.events.push(cNote);
    //   })
    //   console.log(this.events);
    // });
    // this.events = Array.from(this.events);
    this.events$ = this.eventsDB.map((item) => {
      return item.map((node) => {
        var cEvent: CalendarEvent;
        if (node.enum === 'EVENT') {
          cEvent = {
            title: node.title,
            color: colors.blue,
            start: new Date(node.date),
            meta: {
             incrementsBadgeTotal: true,
             description: node.details,
             type: node.type
            }
          }
        }
        else if (node.enum === 'NOTE') {
          cEvent = {
            title: node.title,
            color: colors.yellow,
            start: new Date(node.date),
            meta: {
             incrementsBadgeTotal: true,
             description: node.details            
           }
          }
        }
        else if (node.enum === 'SURVEY') {
          cEvent = {
            title: 'Daily Survey',
            color: colors.red,
            start: new Date(node.date),
            allDay: true,
            meta: {
             incrementsBadgeTotal: true,
             mood: node.mood,
             moodDisplay: node.moodDisplay,
             sleepQuality: node.sleepQuality,
             sleepQualityDisplay: node.sleepQualityDisplay,
             sleepTime: node.sleepTime,
             social: node.social,
             socialDisplay: node.socialDisplay            
           }
          }
        }
        return cEvent; 
        });
    });
    // var temp = this.notesDB.map((item) => {
    //   return item.map((node) => {
    //     var cEvent: CalendarEvent = {
    //         title: node.title,
    //         color: colors.yellow,
    //         start: new Date(node.date),
    //         meta: {
    //          incrementsBadgeTotal: true,
    //          description: node.details            
    //        }
    //       }
    //       return cEvent; 
    //     });
    // });

    // this.events$ = Observable.merge(temp, this.events$);
    // var combined = this.events$.mergeAll();
    // console.log(this.events$);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }	

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}

