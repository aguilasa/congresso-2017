import { Component, ViewChild } from '@angular/core';

import { AlertController, App, List, ModalController, NavController, LoadingController, Slides, Content } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  @ViewChild('mySlider') slider: Slides;
  @ViewChild(Content) content: Content;

  dayIndex = 0;
  segment = 'sab';
  slides: any = [{ day: 0, segment: "sab" }, { day: 1, segment: "dom" }, { day: 2, segment: "seg" }, { day: 3, segment: "ter" }];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData
  ) {
    for (let slide of this.slides) {
      this.confData.getTimeline(slide.day).subscribe(data => {
        slide.groups = data.groups;
      });
    }
  }

  ionViewDidLoad() {
    this.app.setTitle('Programação');
    this.updateSchedule(false);
  }

  updateSchedule(doSlide) {
    this.scrollToTop();
    this.dayIndex = this.getDayIndex(this.segment);
    
    if (doSlide) {
      this.slider.slideTo(this.dayIndex);
    }
  }

  goToSessionDetail(sessionData) {
    this.navCtrl.push(SessionDetailPage, sessionData);
  }

  getDayIndex(segmentValue) {
    return this.slides.findIndex((seg) => {
      return seg.segment === segmentValue;
    });
  }

  onSlideChanged() {
    const currentSlide = this.slides[this.slider.getActiveIndex()];
    this.segment = currentSlide.segment;
    this.updateSchedule(false);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}
