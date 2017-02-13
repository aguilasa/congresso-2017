import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Raphael from 'raphael';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('container')
  container: ElementRef;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log(this.container);
  }

}