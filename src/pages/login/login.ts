import { Component } from '@angular/core';
import {
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  public loading: Loading;
  email: string = ''
  password: string = ''

  //constructor
  constructor(
    public navCtrl: NavController,     
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {}

  login(){
    //create loading controller for page
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    //sign in with firebase using the email and password provided by our input fields
    this.authProvider.loginWithEmail(this.email, this.password).then(authData => {
      //print out authData 
      this.loading.dismiss().then(() => {
        //if user does exist send us to the home page
        this.navCtrl.setRoot(TabsPage);
      })      
    }).catch((error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
  }
}
