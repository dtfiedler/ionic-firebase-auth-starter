import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController,
  Loading, 
  AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {TabsPage} from '../../pages/tabs/tabs';

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

  loginWithGoogle(){
    //create loading controller for page
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.authProvider.loginWithGoogle().then((res) => {
      this.authProvider.loginToFirebaseWithToken(res.idToken).then(() => {
        this.loading.dismiss().then(() => {
            //if user does exist send us to the home page
            this.navCtrl.setRoot(TabsPage);
        }) 
      })
    }).catch((error) => {
      this.loading.dismiss()
    });
  }

  displayError(message){

  }
}
