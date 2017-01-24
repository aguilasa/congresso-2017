import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-music-detail',
  templateUrl: 'music-detail.html'
})
export class MusicDetailPage {
  music: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.music = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicDetailPage');
  }

}
