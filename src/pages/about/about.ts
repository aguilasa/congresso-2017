import { Component } from '@angular/core';

import { NavController, NavParams, AlertController  } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    public confData: ConferenceData
  ) { }

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

  toggleSeminar(data) {
    for (let s of this.seminarData) {
      if (s.id !== data.id) {
        s.showDetails = false;
      }
    }

    data.showDetails = !data.showDetails;
    data.icon = data.showDetails ? 'ios-arrow-up' : 'ios-arrow-down';
  }

  toggleSeminars() {
    this.showSeminars = !this.showSeminars;
    this.seminarsIcon = this.showSeminars ? 'ios-arrow-up' : 'ios-arrow-down';
  }

  togglePrices() {
    this.showPrices = !this.showPrices;
    this.pricesIcon = this.showPrices ? 'ios-arrow-up' : 'ios-arrow-down';
  }

  showAlertKiosk(product) {
    let alert = this.alerCtrl.create({
      title: product.name,
      message: 'Onde você encontra esse produto: ' + product.kiosks,
      buttons: ['Ok']
    });
    alert.present()
  }
}
