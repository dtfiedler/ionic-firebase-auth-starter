import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { IntroPage } from '../intro/intro';
import { StatusBar } from 'ionic-native';
import { OtherPage } from '../other/other';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  other: OtherPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      StatusBar.styleLightContent()
    })
  }

  loginModal(){
    this.navCtrl.push(LoginPage)
  }

  createAccount(){
    this.navCtrl.push(IntroPage)
  }

  otherModal(){
    let otherModal = this.modalCtrl.create(OtherPage);
    otherModal.present();
  }
}
