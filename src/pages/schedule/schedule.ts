import { Component, ViewChild } from '@angular/core';

import { AlertController, App, List, ModalController, NavController, LoadingController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = '0';
  shownSessions: any = [];
  groups = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Programação');
    this.updateSchedule();
  }

  updateSchedule() {
    this.dayIndex = parseInt(this.segment);
    this.confData.getTimeline(this.dayIndex, this.queryText).subscribe(data => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }
}
