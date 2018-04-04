import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {

  }

  logout(){
    this.authProvider.logoutUser();
  }
}
