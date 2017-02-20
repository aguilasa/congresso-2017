import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import Raphael from 'raphael';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('container')
  container: ElementRef;

  constructor(
    public navCtrl: NavController,
    public plt: Platform) {

  }

  ionViewDidLoad() {

  }

  getContainer() {
    return this.container.nativeElement;
  }

}