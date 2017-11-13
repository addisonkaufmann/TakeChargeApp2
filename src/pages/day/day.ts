import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { NoteModalPage } from '../note-modal/note-modal';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Auth } from '../../providers/auth.provider';
import { Observable } from 'rxjs/Rx';
import { CalendarEvent } from 'angular-calendar';


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

/**
 * Generated class for the DayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayPage {

	viewDate: any = null;

	createEvent(): void {
		const modal = this.modalCtrl.create(EventModalPage, this.viewDate);
		modal.onDidDismiss(data => {
			console.log(data);
			this.eventsDB.push({
            	title: data.title,
            	details: data.details,
            	type: data.type,
            	enum: 'EVENT',
            	date: this.viewDate.toISOString()
          	});
	    });
   		modal.present();

	};

	createNote(): void {
		const modal = this.modalCtrl.create(NoteModalPage, this.viewDate);
		modal.onDidDismiss(data => {
			console.log(data);
			this.eventsDB.push({
            	title: data.title,
            	details: data.details,
            	enum: 'NOTE',
            	date: this.viewDate.toISOString()
          	});
	    });
   		modal.present();
	};

	events$: Observable<Array<CalendarEvent>>;
  	eventsDB: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public db: AngularFireDatabase, public auth: Auth, public alertCtrl: AlertController) {
		this.viewDate = new Date(navParams.data);
		this.eventsDB = db.list('/' + this.auth.user.userId + '/events');
		let alert = this.alertCtrl.create({
          title: 'Hello ' + this.auth.user.givenName,
          subTitle: 'Your user id is ' + this.auth.user.userId,
          buttons: ['dismiss']
        });
       alert.present();
	}

	ngOnInit(): void {
    	this.fetchEvents();
  	}

  	fetchEvents(): void {
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
	}

	ionViewDidLoad() {
	}

}
