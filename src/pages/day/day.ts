import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { NoteModalPage } from '../note-modal/note-modal';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

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
	    });
   		modal.present();

	};

	createNote(): void {
		const modal = this.modalCtrl.create(NoteModalPage, this.viewDate);
		modal.onDidDismiss(data => {
			console.log(data);
			this.notes.push({
            	title: data.title,
            	details: data.details
          	});
	    });
   		modal.present();
	};

	notes: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public db: AngularFireDatabase) {
		this.viewDate = new Date(navParams.data);
		this.notes = db.list('/notes');
	}

	ionViewDidLoad() {
	}

}
