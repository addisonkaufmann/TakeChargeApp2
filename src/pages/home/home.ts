import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	userProfile: any = null;
	constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private alertCtrl: AlertController) {}

	showAlert(data): void {
	    let alert = this.alertCtrl.create({
	        title: 'Result',
	        subTitle: JSON.stringify(data),
	        buttons: ['Dismiss']
	     });
	     alert.present();
	};

	loginUser(): void {
	  this.googlePlus.login({
	    'webClientId': '889363901107-flqospl2tq54j07uvguise4ffbk0trhc.apps.googleusercontent.com',
	    'offline': true
	  }).then( res => function(res){this.showAlert(res)})
	    .catch(err => function(err){this.showAlert(err)});
	};

	
}
