import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { NoteModalPage } from '../note-modal/note-modal';


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
	    });
   		modal.present();
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
		this.viewDate = new Date(navParams.data);
	}

	ionViewDidLoad() {
	}

}
