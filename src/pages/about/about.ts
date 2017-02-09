import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  seminarData: Array<{ id: number, title: string, details: string, icon: string, showDetails: boolean }> = [];
  showSeminars: boolean = false;
  seminarsIcon: string = "ios-arrow-down";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: ConferenceData
  ) { }

  ionViewDidLoad() {
    this.loadSeminars();
  }

  loadSeminars() {
    this.confData.getSeminars().subscribe(seminars => {
      let i: number = 0;
      for (let seminar of seminars) {
        i++;
        this.seminarData.push({
          id: i,
          title: seminar.title,
          details: seminar.description,
          icon: 'ios-arrow-down',
          showDetails: false
        });
      }
    });
  }

  toggleSeminar(data) {
    for (let s of this.seminarData) {
      if (s.id !== data.id) {
        s.showDetails = false;
      }
    }

    data.showDetails = !data.showDetails;
    data.icon = data.showDetails ? 'ios-arrow-up' : 'ios-arrow-down';
  }

  toggleSeminars() {
    this.showSeminars = !this.showSeminars;
    this.seminarsIcon = this.showSeminars ? 'ios-arrow-up' : 'ios-arrow-down';
  }
}
