import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-modal-tone',
  templateUrl: 'modal-tone.html'
})
export class ModalTonePage {
  music: any;
  sequences: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public confData: ConferenceData
    ) {
      this.music = this.navParams.get('music');
      this.loadSequence();
      
    }

  ionViewDidLoad() {
    //this.music = this.navParams.get('music');
  }

  confirmTone() {
    this.viewCtrl.dismiss(this.music);
  }

  loadSequence() {
    let sequences: Array<any>;
    let seqs = this.confData.getSequenceByTone(this.music.tone);
    for (let s of seqs) {
      let seq = {tone: s, color: "light"};
      if (s === this.music.tone) {
        seq.color = "primary";
      }
      sequences.push(seq);
    }

    this.sequences = sequences;
  }

}
