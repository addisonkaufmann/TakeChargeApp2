import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth.provider';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Rx';


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
		        id: 'name',
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
		        handler: data => {
		          	this.userWhitelist.push(data[0]);
		          	console.log("Whitelist added: " + data[0]);
		        }
		      }
		    ]
		  });
		  alert.present();
	};

  userWhitelist: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public auth: Auth, public db: AngularFireDatabase) {
  	this.userWhitelist = this.auth.whitelist;
  }
}
