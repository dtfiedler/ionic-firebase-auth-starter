import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import configs from '../../firebase';

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
  logout(){
    this.auth.logoutUser().then(() => {
      this.nav.setRoot(WelcomePage)
    })
  }

  //subscribe to user auth state
  watchUserAuth(){
    const subscribe = this.auth.firebaseAuth().onAuthStateChanged(user => {
      if (!user){
        //user is unsbscribed
        this.rootPage = WelcomePage
        subscribe()
      } else {
        //still authenticated
        this.rootPage = HomePage
        subscribe()
      }
    })
  }
}
