import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalTonePage } from '../modal-tone/modal-tone'

@Component({
  selector: 'page-music-detail',
  templateUrl: 'music-detail.html'
})
export class MusicDetailPage {
  music: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.music = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicDetailPage');
  }

  changeTone() {
    console.log('changeTone MusicDetailPage');
    let modal = this.modalCtrl.create(ModalTonePage, {
      music: this.music
    });

    modal.onDidDismiss((music) => {

      this.music = music;

    });

    modal.present();
  }

}
