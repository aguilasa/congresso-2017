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
    // console.log(this.container);
    // this.getContainer().innerHTML = this.plt.width() + " x " + this.plt.height();
  }

  getContainer() {
    return this.container.nativeElement;
  }

}