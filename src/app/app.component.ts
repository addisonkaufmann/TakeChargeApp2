import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';




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

  rootPage: any = CalendarPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public alertCtrl: AlertController, public googlePlus: GooglePlus) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
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
    });
  };

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  };

  ngOnInit(){
    this.storage.get('firstLaunch')
    .then((value) => {
      if (value == null || value){
        this.handleFirstLaunch();
      } else {
        this.handleLaunch();
      }
    }).catch(() => this.handleFirstLaunch());
  };

  handleFirstLaunch(){
    this.nav.setRoot(HomePage);
  };

  handleLaunch(){
    this.loginUser();
  };

  loginUser(): void {
      this.googlePlus.login({
        'webClientId': '889363901107-flqospl2tq54j07uvguise4ffbk0trhc.apps.googleusercontent.com',
        'offline': true
      }).then((res) => {
        this.storage.set('firstLaunch', false);
        let alert = this.alertCtrl.create({
            title: 'Hello ' + res.givenName,
            subTitle: 'Your user id is ' + res.userId,
            buttons: ['dismiss']
          });
         alert.present();
        }, (err) => {
            let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Cannot login to Google.',
            buttons: ['dismiss']
          });
         alert.present();
        });
  };
}
