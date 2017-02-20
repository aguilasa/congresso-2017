import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { MusicDetailPage } from '../music-detail/music-detail'

@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html'
})
export class MusicListPage {
  musics = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData) { }

  ionViewDidLoad() {
    this.confData.getMusics().subscribe(musics => {
      this.musics = musics;
    });
  }

  goToMusicDetail(music) {
    this.navCtrl.push(MusicDetailPage, music);
  }

}
