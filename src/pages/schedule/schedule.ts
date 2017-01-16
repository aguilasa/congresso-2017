import { Component, ViewChild } from '@angular/core';

import { AlertController, App, List, ModalController, NavController, LoadingController, Slides } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  @ViewChild('mySlider') slider: Slides;

  dayIndex = 0;
  queryText = '';
  segment = 'sab';
  shownSessions: any = [];
  groups = [];
  confDate: string;
  slides: any;
  segments: any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData
  ) {
    this.slides = [{ id: "sab" }, { id: "dom" }, { id: "seg" }, { id: "ter" }];
    this.segments = [{ id: "sab" }, { id: "dom" }, { id: "seg" }, { id: "ter" }];
  }

  ionViewDidLoad() {
    this.app.setTitle('Programação');
    this.updateSchedule();
  }

  updateSchedule() {
    this.dayIndex = this.getDayIndex(this.segment);
    this.confData.getTimeline(this.dayIndex, this.queryText).subscribe(data => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
    this.slider.slideTo(this.dayIndex);
  }

  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }

  getDayIndex(segmentValue) {
    return this.segments.findIndex((seg) => {
      return seg.id === segmentValue;
    });
  }

  onSlideChanged(slider) {
    const currentSlide = this.slides[slider.activeIndex];
    this.segment = currentSlide.id;
    console.log('Slide changed: ' + currentSlide.id);
  }

}
