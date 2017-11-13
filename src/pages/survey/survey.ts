import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SurveyModalPage } from '../survey-modal/survey-modal';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Auth } from '../../providers/auth.provider';



@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {


	startSurvey(): void {
		const modal = this.modalCtrl.create(SurveyModalPage);
		modal.onDidDismiss(data => {
			console.log(data);
			this.events.push({
            	mood: data.mood,
            	moodDisplay: data.moodDisplay,
            	sleepQuality: data.sleepQuality,
            	sleepQualityDisplay: data.sleepQualityDisplay,
            	sleepTime: data.sleepTime,
            	social: data.social,
            	socialDisplay: data.socialDisplay,
            	enum: 'SURVEY',
            	date: data.dateISO
          	});
	    });
   		modal.present();

	};

	today: any = new Date();
	complete: boolean = false;

	events: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFireDatabase, public auth: Auth) {
		this.events = db.list('/' + this.auth.user.userId + '/events');
	}	
}
