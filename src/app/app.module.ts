import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { MusicListPage } from '../pages/music-list/music-list';
import { MusicDetailPage } from '../pages/music-detail/music-detail';
import { ModalTonePage } from '../pages/modal-tone/modal-tone';
import { SeminarListPage } from '../pages/seminar-list/seminar-list';

import { ConferenceData } from '../providers/conference-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    MapPage,
    SchedulePage,
    SessionDetailPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    MusicListPage,
    MusicDetailPage,
    ModalTonePage,
    SeminarListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    MapPage,
    SchedulePage,
    SessionDetailPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    MusicListPage,
    MusicDetailPage,
    ModalTonePage,
    SeminarListPage
  ],
  providers: [
    ConferenceData,
    SplashScreen,
    InAppBrowser
  ]
})
export class AppModule { }
