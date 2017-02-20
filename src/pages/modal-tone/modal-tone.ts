import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-modal-tone',
  templateUrl: 'modal-tone.html'
})
export class ModalTonePage {
  music: any;
  rows: any;
  canLeave: boolean = false;
  name: string;
  tone: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public confData: ConferenceData
  ) {

  }

  ionViewDidLoad() {
    this.music = this.navParams.get('music');
    this.name = this.music.name;
    this.tone = this.music.tone;
    this.loadRowsSequence();
  }

  ionViewCanLeave() {
    return this.canLeave;
  }

  confirmTone() {
    this.canLeave = true;
    this.viewCtrl.dismiss(this.music);
  }

  loadRowsSequence() {
    let sequences: Array<any> = [];
    let rows: Array<any> = [];

    for (let i = 1; i <= this.music.sequence.length; i++) {
      let s = this.music.sequence[i - 1];
      let seq = { tone: s, color: "light" };

      if (s === this.music.tone) {
        seq.color = "primary";
      }
      sequences.push(seq);

      if (i > 0 && i % 4 == 0) {
        rows.push({ sequences: sequences });
        sequences = [];
      }
    }

    this.rows = rows;
  }

  updateRows() {
    for (let row of this.rows) {
      for (let sequence of row.sequences) {
        sequence.color = "light";
        if (sequence.tone === this.music.tone) {
          sequence.color = "primary";
        }
      }
    }
  }

  changeTone(seq) {
    this.music.tone = seq.tone;
    this.updateRows();
  }

  restore(update) {
    this.music.tone = this.music.original;
    if (update) {
      this.updateRows();
    }
  }

  cancel() {
    this.canLeave = true;
    this.music.tone = this.tone;
    this.viewCtrl.dismiss(this.music);
  }

}
