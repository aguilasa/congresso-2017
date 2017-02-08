import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  seminarData: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];
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
      for (let seminar of seminars) {
        this.seminarData.push({
          title:  seminar.title,
          details: seminar.description,
          icon: 'ios-arrow-down',
          showDetails: false
        });
      }
    });
  }

  toggleSeminar(data) {
    for (let s of this.seminarData) {
      s.showDetails = false;
    }
    
    data.showDetails = !data.showDetails;
    data.icon = data.showDetails ? 'ios-arrow-up' : 'ios-arrow-down';
  }

  toggleSeminars() {
    this.showSeminars = !this.showSeminars;
    this.seminarsIcon = this.showSeminars ? 'ios-arrow-up' : 'ios-arrow-down';
  }
}
