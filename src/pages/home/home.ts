import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, MenuController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { Storage } from '@ionic/storage';

import { Auth } from '../../providers/auth.provider';
import { User } from '../../models/user.model';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	result: string = "hello, world";
	browserDebug: boolean = true;
	
	showAuth: boolean = false;
	authSuccess: boolean = false;
	showAddUser: boolean = false;
	user: User = null;
	displayName: string;
	constructor(public navCtrl: NavController, public auth: Auth, private alertCtrl: AlertController, private menuCtrl: MenuController, private storage: Storage) {
		this.menuCtrl.enable(false, 'sideMenu');
	}

	fakeLogin(): void {
		this.auth.mocklogin();
		this.authSuccess = true;
		this.user = this.auth.getUser();
		this.displayName = this.user.givenName;
		console.log(this.user);
	}

	setSelf(isSelf): void {
		if (isSelf){
			this.finishOnboard();
		} else {
			this.user.givenName = "";
			this.user.lastName = "";
			this.showAddUser = true;
		}
	}

	finishOnboard(): void {
		//TODO: submit user object to DB
		console.log(this.user);
		this.storage.set('firstLaunch', false);
		this.menuCtrl.enable(true, 'sideMenu');
		this.navCtrl.setRoot(CalendarPage);
	}

	loginUser(): void {	
		if (this.browserDebug){
			this.fakeLogin();
			return;
		}
		this.auth.login()
			.then(res => {
				console.log("promise resolved");
				console.log(res);
				this.user = res;
				this.authSuccess = true;
				this.displayName = this.user.givenName;

			}, err =>{
				let alert = this.alertCtrl.create({
		        title: 'Error',
		        subTitle: 'Cannot login to Google. ' + JSON.stringify(err),
		        buttons: [
				      {
				        text: 'Close',
				        role: 'cancel'
				      }
				    ]
				  });
		     	alert.present();

			});
	};
	
}
