import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { NoteModalPage } from '../note-modal/note-modal';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Auth } from '../../providers/auth.provider';


/**
 * Generated class for the DayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {

	viewDate: any = null;

	createEvent(): void {
		const modal = this.modalCtrl.create(EventModalPage, this.viewDate);
		modal.onDidDismiss(data => {
			console.log(data);
			this.events.push({
            	title: data.title,
            	details: data.details,
            	type: data.type,
            	date: this.viewDate.toISOString()
          	});
	    });
   		modal.present();

	};

	createNote(): void {
		const modal = this.modalCtrl.create(NoteModalPage, this.viewDate);
		modal.onDidDismiss(data => {
			console.log(data);
			this.notes.push({
            	title: data.title,
            	details: data.details,
            	date: this.viewDate.toISOString()
          	});
	    });
   		modal.present();
	};

	events: FirebaseListObservable<any>;
	notes: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public db: AngularFireDatabase, public auth: Auth, public alertCtrl: AlertController) {
		this.viewDate = new Date(navParams.data);
		this.notes = db.list('/' + this.auth.user.userId + '/notes');
		this.events = db.list('/' + this.auth.user.userId + '/events');
		let alert = this.alertCtrl.create({
          title: 'Hello ' + this.auth.user.givenName,
          subTitle: 'Your user id is ' + this.auth.user.userId,
          buttons: ['dismiss']
        });
       alert.present();
	}

	ionViewDidLoad() {
	}

}
