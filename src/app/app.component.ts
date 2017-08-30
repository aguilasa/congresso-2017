import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { ConferenceData } from '../providers/conference-data';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Programação', component: TabsPage, icon: 'calendar' },
    { title: 'Palestrantes', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'Músicas', component: TabsPage, index: 2, icon: 'musical-notes' },
    { title: 'Mapa', component: TabsPage, index: 3, icon: 'locate' },
    { title: 'Info', component: TabsPage, index: 4, icon: 'information-circle' }
  ];

  rootPage: any;

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public splashScreen: SplashScreen
  ) {
    this.rootPage = TabsPage;
    this.platformReady();

    // load the conference data
    confData.load();
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      // this.nav.push(page.component, { tabIndex: page.index });
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        
      });
    }
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      if (this.splashScreen) {
        setTimeout(() => {
          this.splashScreen.hide();
        }, 100);
      }
    });
  }
}
