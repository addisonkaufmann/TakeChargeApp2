import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-survey-modal',
  templateUrl: 'survey-modal.html',
})
export class SurveyModalPage {

	closeModal(): void {
		console.log("closing");
		this.viewCtrl.dismiss();
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

}
