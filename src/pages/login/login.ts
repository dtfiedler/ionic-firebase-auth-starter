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
  templateUrl: 'login.html',
  providers: [AuthProvider]
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

  loginWithEmail(){
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
      this.displayAuthError(error.message)
    });
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
  
    //login/signup with Google
    loginWithGoogle(){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.authProvider.loginWithGoogle().then((res) => {
        this.authProvider.loginToFirebaseWithGoogleToken(res.idToken).then(() => {
          this.loading.dismiss().then(() => {
              //if user does exist send us to the home page
              this.navCtrl.setRoot(TabsPage);
          }) 
        }, error => {
          console.log(error)
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
