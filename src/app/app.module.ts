import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { CalendarModule } from 'angular-calendar';


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
    SurveyModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot()
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
    SurveyModalPage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
