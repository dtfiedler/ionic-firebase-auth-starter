import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
declare var google;

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  public loading: Loading;
  questionList: any = ["What's your name?", "And, your email?", "Create a password", "Where do you work?"]
  question: string
  autocompleteItems: any;
  autocomplete: any;
  showFabRight = true;  
  showFabLeft = false;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, public loadingCtrl: LoadingController){
    this.question = this.questionList[0]
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  
  ionViewDidLoad(){
    this.showFabRight = true;  
    this.showFabLeft = false;
  }
  
  goToHome(){
    this.navCtrl.setRoot('Tabs');
  }

  slideChanged(){
    if (this.slides.isBeginning()){
      this.showFabLeft = false;
      this.showFabRight = true;
    } else {
      this.showFabLeft = true;
    }
  }

  nextSlide(){
    if (this.slides.isEnd()){
      this.createAccount();
    } else {
      this.slides.lockSwipeToNext(false);
      this.slides.slideNext();
      this.slides.lockSwipeToNext(true);    
    }
  }

  prevSlide(){
    this.slides.lockSwipeToNext(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToNext(true);    
  }

  chooseItem(item: any) {
    this.autocompleteItems = [];
    this.autocomplete.query = item;
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'US'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if (predictions != null) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }

  createAccount(){
    let me = this;
    //create loading controller for page
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    //create user with firebase
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
      //set values for user
      user.updateProfile({
        displayName: me.firstName + " " + me.lastName,
        photoURL: ""
      }).then(()=> {
        me.loading.dismiss();
        me.navCtrl.setRoot(TabsPage)
      })
    }).catch(error  => {
      console.log('failed to create user', error);
      //display error!
      me.loading.dismiss();
    });
  }
}
