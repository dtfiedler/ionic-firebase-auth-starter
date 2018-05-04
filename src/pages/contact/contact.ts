import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { User } from 'firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public loading: Loading;
  currentUser: User

  constructor(
    public navCtrl: NavController, 
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {
      this.currentUser = this.authProvider.currentUser();
      console.log(this.currentUser)
  }

  logout(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.authProvider.logoutUser().then(() => {
      this.loading.dismiss()
    })
  }
}
