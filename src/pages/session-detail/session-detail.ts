import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { SeminarListPage } from '../seminar-list/seminar-list';


@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.session = navParams.data;
    this.session.isSeminar = ('isSeminar' in this.session) ? this.session.isSeminar : false;
  }

  ionViewDidLoad() {

  }

  goToSeminars() {
    this.navCtrl.push(SeminarListPage);
  }

}
