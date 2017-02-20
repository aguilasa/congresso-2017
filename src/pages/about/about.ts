import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  seminarData: Array<{ id: number, title: string, details: string, icon: string, showDetails: boolean }> = [];
  showSeminars: boolean = false;
  showPrices: boolean = false;
  seminarsIcon: string = "ios-arrow-down";
  pricesIcon: string = "ios-arrow-down";
  products: any;
  shows: Array<{ id: number, icon: string, show: boolean }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    public confData: ConferenceData
  ) {
    this.shows.push({ id: 1, icon: "ios-arrow-down", show: false }); //seminários
    this.shows.push({ id: 2, icon: "ios-arrow-down", show: false }); //preços
  }

  ionViewDidLoad() {
    this.loadSeminars();
    this.loadProducts();
  }

  loadSeminars() {
    this.confData.getSeminars().subscribe(seminars => {
      let i: number = 0;
      for (let seminar of seminars) {
        i++;
        this.seminarData.push({
          id: i,
          title: seminar.title,
          details: seminar.description,
          icon: 'ios-arrow-down',
          showDetails: false
        });
      }
    });
  }

  loadProducts() {
    this.confData.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  showAlertKiosk(product) {
    let alert = this.alerCtrl.create({
      title: product.name,
      message: 'Onde você encontra esse produto: ' + product.kiosks,
      buttons: ['Ok']
    });
    alert.present()
  }

  togleInfo(id) {
    for (let s of this.shows) {
      if (s.id === id) {
        s.show = !s.show;
      } else {
        s.show = false;
      }
      s.icon = s.show ? 'ios-arrow-up' : 'ios-arrow-down';
    }
  }

  toggleSeminar(data) {
    for (let s of this.seminarData) {
      if (s.id !== data.id) {
        s.showDetails = false;
      }
    }

    data.showDetails = !data.showDetails;
    data.icon = data.showDetails ? 'ios-arrow-up' : 'ios-arrow-down';
  }
}
