import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

/*
  Generated class for the SeminarList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-seminar-list',
  templateUrl: 'seminar-list.html'
})
export class SeminarListPage {

  seminarData: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: ConferenceData
  ) { }

  ionViewDidLoad() {
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

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-arrow-down';
    } else {
      data.showDetails = true;
      data.icon = 'ios-arrow-up';
    }
  }

}
