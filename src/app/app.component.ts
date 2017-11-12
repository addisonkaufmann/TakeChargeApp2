import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { Auth } from '../providers/auth.provider';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { SurveyPage } from '../pages/survey/survey';
import { AnalyticsPage } from '../pages/analytics/analytics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public alertCtrl: AlertController, public auth: Auth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Calendar', component: CalendarPage },
      { title: 'Survey', component: SurveyPage }, 
      { title: 'Analytics', component: AnalyticsPage }
    ];

  };

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if ( !this.platform.is('cordova')) {
        console.log("Ionic2 running in browser."); 
        this.handleBrowserLaunch();  
      } else {
        this.storage.get('firstLaunch')
        .then((value) => {
          if (value == null || value){
            this.handleFirstLaunch();
          } else {
            this.handleLaunch();
          }
        }).catch(() => this.handleFirstLaunch());
      }
       
    });
  };

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  };

  handleFirstLaunch(){
    this.nav.setRoot(HomePage);
  };

  handleLaunch(){
    this.auth.login()
      .then(res => {
            let alert = this.alertCtrl.create({
              title: 'Hello ' + res.givenName,
              subTitle: 'Your user id is ' + res.userId,
              buttons: ['dismiss']
            });
           alert.present();
       this.nav.setRoot(CalendarPage);
      }, err => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Cannot login to Google.',
                buttons: ['dismiss']
              });
             alert.present();
            this.nav.setRoot(HomePage);
      });
      
  };

  handleBrowserLaunch(){
    this.auth.mocklogin();
     let alert = this.alertCtrl.create({
          title: 'Hello ' + this.auth.user.givenName,
          subTitle: 'Your user id is ' + this.auth.user.userId,
          buttons: ['dismiss']
        });
       alert.present();
       this.nav.setRoot(CalendarPage);
  };
    
}
