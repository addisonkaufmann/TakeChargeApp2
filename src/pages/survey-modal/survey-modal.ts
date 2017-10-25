import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Survey } from '../../models/survey.model';

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

	model = new Survey();
	step = 1;

	closeModal(data): void {
		this.viewCtrl.dismiss(data);
	};

	finishSurvey(): void {
		this.model.prepare();
		this.closeModal(this.model);
	};

	goNext(): void {
		this.step++;
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
		console.log(this.step);
		console.log(this.model);
	}

}
