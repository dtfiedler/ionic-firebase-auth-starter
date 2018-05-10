import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  Platform, 
  ModalController, 
  Loading, 
  LoadingController, 
  AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { IntroPage } from '../intro/intro';
import { StatusBar } from 'ionic-native';
import { OtherPage } from '../other/other';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  public loading: Loading;

  other: OtherPage
  constructor(
    public navCtrl: NavController,     
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
     public platform: Platform,
     public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      StatusBar.styleLightContent()
    })
  }

  //create new account
  createAccount(){
    this.navCtrl.push(IntroPage)
  }

  //go to login page
  loginModal(){
    this.navCtrl.push(LoginPage)
  }
  
  //login/signup with facebook
  loginWithFacebook(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.authProvider.loginWithFacebook().then((res) => {
      this.authProvider.loginToFirebaseWithFacebookToken(res.authResponse.accessToken).then(() => {
        this.loading.dismiss().then(() => {
          //if user does exist send us to the home page
          this.navCtrl.setRoot(TabsPage);
        }) 
      }, error => {
        this.loading.dismiss().then(() => {
          this.displayAuthError(error.message)
        })
      })
    }).catch((error) => {
      this.loading.dismiss().then(() => {
        this.displayAuthError(error)
      })
    });
  }

  //more options sign in button
  otherModal(){
    let otherModal = this.modalCtrl.create(OtherPage);
    otherModal.present();
  }

  //display any auth errors
  displayAuthError(message){
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
