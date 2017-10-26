import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController, MenuController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { Storage } from '@ionic/storage';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	auth = false;
	result: string = "hello, world";
	
	constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private alertCtrl: AlertController, private menuCtrl: MenuController, private storage: Storage) {
		this.menuCtrl.enable(false, 'sideMenu');
	}


	loginUser(): void {
	  	this.googlePlus.login({
	    	'webClientId': '889363901107-flqospl2tq54j07uvguise4ffbk0trhc.apps.googleusercontent.com',
	    	'offline': true
	  	}).then((res) => {
	  		this.storage.set('firstLaunch', false);
	  		let alert = this.alertCtrl.create({
		        title: 'Hello ' + res.givenName,
		        subTitle: 'Your user id is ' + res.userId,
		        buttons: [
				      {
				        text: 'Done',
				        handler: () => {
				          	this.menuCtrl.enable(true, 'sideMenu');
				          	this.navCtrl.setRoot(CalendarPage);

				        }
				      }
				    ]
				  });
		     alert.present();
        }, (err) => {
            let alert = this.alertCtrl.create({
		        title: 'Error',
		        subTitle: 'Cannot login to Google.',
		        buttons: [
				      {
				        text: 'Skip',
				        handler: () => {
				          	this.menuCtrl.enable(true, 'sideMenu');
				          	this.navCtrl.setRoot(CalendarPage);

				        }
				      }
				    ]
				  });
		     alert.present();
        });
	};
	
}
