import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;  
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) { 
    this.initializeApp();
    this.intializeFirebase();
    this.unsubscribe();
  }

  unsubscribe(){
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = WelcomePage;
      } else {
        this.rootPage = TabsPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  intializeFirebase(){
    var config = {
      apiKey: "AIzaSyB7sUGTcabTJ22lHqtLAlra8tDXc-y3Ab0",
      authDomain: "brownbag-44cd7.firebaseapp.com",
      databaseURL: "https://brownbag-44cd7.firebaseio.com",
      projectId: "brownbag-44cd7",
      storageBucket: "brownbag-44cd7.appspot.com",
      messagingSenderId: "325159181067"
    };
    firebase.initializeApp(config);
  }

  logout(){
    this.nav.setRoot(WelcomePage)
  }
}
