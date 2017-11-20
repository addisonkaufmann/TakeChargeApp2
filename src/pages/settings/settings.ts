import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth.provider';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	share(): void {
		let alert = this.alertCtrl.create({
		    title:  'Your user id is:',
		    subTitle: this.auth.user.userId,
		    buttons: [
		      {
		        text: 'Close',
		        role: 'cancel'
		      }
		    ]
		  });
		  alert.present();
	};

	add(): void {
		let alert = this.alertCtrl.create({
		    title:  'Add account',
		    subTitle: 'Enter the person\'s user id',
		    inputs: [
		      {
		        name: 'name',
		        placeholder: 'User Id',
		      }
		      ],
		    buttons: [
		   
		      {
		        text: 'Cancel',
		        role: 'cancel'
		      },
		      {
		        text: 'Add',
		        handler: () => {
		          console.log("Adding account x");
		        }
		      }
		    ]
		  });
		  alert.present();
	};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public auth: Auth) {
  }


}
