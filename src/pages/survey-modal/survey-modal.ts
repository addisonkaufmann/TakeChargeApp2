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

	model = new Survey(4, "Average", 8, 4, "Average", 4, "Average");
	readonly moodStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];
	readonly sleepStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];
	readonly socialStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];
	step = 1;

	closeModal(data): void {
		this.viewCtrl.dismiss(data);
	};

	finishSurvey(): void {
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
