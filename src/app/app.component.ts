import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import configs from '../../firebase';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;  
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthProvider) { 
    this.initializeApp();
    this.intializeFirebase();
    this.watchUserAuth();
  }

  //intitalize and get plugins ready
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //intialize firebase
  intializeFirebase(){
    this.auth.initializeApp(configs.firebaseConfigs);
  }

  //log user out
  public logout():Promise<any> {
    return this.auth.logoutUser().then(() => {
      this.rootPage = LoginPage
    })
  }

  //subscribe to user auth state
  watchUserAuth(){
    this.auth.firebaseAuth().onAuthStateChanged(user => {
      if (!user){
        //user is unsbscribed
        this.rootPage = LoginPage
      } else {
        //still authenticated
        this.rootPage = TabsPage
      }
    })
  }
}
