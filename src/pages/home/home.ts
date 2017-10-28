import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, MenuController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { Storage } from '@ionic/storage';

import { Auth } from '../../providers/auth.provider';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	result: string = "hello, world";
	
	showAuth: false;
	constructor(public navCtrl: NavController, public auth: Auth, private alertCtrl: AlertController, private menuCtrl: MenuController, private storage: Storage) {
		this.menuCtrl.enable(false, 'sideMenu');
	}


	loginUser(): void {
		this.auth.login()
			.then(res => {
				console.log("promise resolved");
				console.log(res);
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
			}, err =>{
				let alert = this.alertCtrl.create({
		        title: 'Error',
		        subTitle: 'Cannot login to Google. ' + JSON.stringify(err),
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
