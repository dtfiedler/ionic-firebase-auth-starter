import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController,
  Loading, 
  AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {TabsPage} from '../../pages/tabs/tabs';
import { IntroPage } from '../intro/intro';

@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {
  public loading: Loading;

  constructor(    
    public navCtrl: NavController,     
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }
  
  closeModal(){
    this.navCtrl.pop();
  }

  createAccount(){
    this.navCtrl.push(IntroPage)
  }

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
        this.displayAuthError(error.message)
      })
    });
  }

  loginWithGoogle(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.authProvider.loginWithGoogle().then((res) => {
      this.authProvider.loginToFirebaseWithToken(res.idToken).then(() => {
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
        this.displayAuthError(error.message)
      })
    });
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
