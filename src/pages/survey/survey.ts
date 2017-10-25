import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SurveyModalPage } from '../survey-modal/survey-modal';



@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {

	startSurvey(): void {
		const modal = this.modalCtrl.create(SurveyModalPage);
		modal.onDidDismiss(data => {
			console.log(data);
	    });
   		modal.present();

	};

	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}	
}
