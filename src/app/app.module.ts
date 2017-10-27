import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { SurveyPage } from '../pages/survey/survey';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { DayPage } from '../pages/day/day';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { NoteModalPage } from '../pages/note-modal/note-modal';
import { SurveyModalPage } from '../pages/survey-modal/survey-modal';
import { WelcomePage } from '../pages/welcome/welcome';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { CalendarModule } from 'angular-calendar';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyB29HunLsY01HaLPgiVRV9aO_5tBVVfkCY",
  authDomain: "takecharge-7435b.firebaseapp.com",
  databaseURL: "https://takecharge-7435b.firebaseio.com",
  projectId: "takecharge-7435b",
  storageBucket: "takecharge-7435b.appspot.com",
  messagingSenderId: "852150779525"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    CalendarPage,
    SurveyPage, 
    AnalyticsPage,
    DayPage,
    EventModalPage, 
    NoteModalPage, 
    SurveyModalPage, 
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    CalendarPage,
    SurveyPage,
    AnalyticsPage,
    DayPage,
    EventModalPage,
    NoteModalPage,
    SurveyModalPage, 
    WelcomePage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
