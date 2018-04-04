import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {

  }

  logout(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.authProvider.logoutUser().then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(WelcomePage)
        })
    }); 
  }
}
