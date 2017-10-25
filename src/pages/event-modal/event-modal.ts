import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../models/event.model';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

	model: Event = new Event();

	closeModal(data): void {
		console.log("closing");
		this.viewCtrl.dismiss(data);
	};

	finishEvent(): void {
		this.closeModal(this.model);
	};
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
		console.log(navParams);
		this.model.date = new Date(navParams.data);
	}

}
