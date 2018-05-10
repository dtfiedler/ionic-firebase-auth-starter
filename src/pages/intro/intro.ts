import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
declare var google;

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers: [AuthProvider]
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
  rightEnabled: boolean = false
  leftEnabled: boolean = false
  service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private zone: NgZone, 
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController
  ){
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
      //validate fields
      if (this.email && this.password && this.firstName && this.lastName){
        this.createAccount();
      } else {
        this.displayAuthError("You are missing some information!")
      }
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

  //create a new account with email and password
  createAccount(){
    let me = this;
    //create loading controller for page
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    //save user to firebase auth users
    this.authProvider.signupWithEmail(this.email, this.password, this.firstName, this.lastName).then(user => {
      //user gets saved to database as well
      me.loading.dismiss();
      //go to home page
      me.navCtrl.setRoot(TabsPage)
    }).catch(error  => {
      //display error
      me.loading.dismiss().then(() => {
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
