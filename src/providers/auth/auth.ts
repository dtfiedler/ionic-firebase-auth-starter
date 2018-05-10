// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { Storage } from '@ionic/storage';
import firebase, { User } from 'firebase'

@Injectable()
export class AuthProvider {

  constructor(
    private storage: Storage,
    private googlePlus: GooglePlus,
    public facebook: Facebook) {
  }

  //returns current user
  currentUser(){
    console.log("Current user:", firebase.auth().currentUser)
    return firebase.auth().currentUser
  }

  //normal login
  loginWithEmail(email: string, password: string): Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  //logout user
  logoutUser(): Promise<void>  {
     return firebase.auth().signOut()
  }

  //login using facebook
  loginWithFacebook():Promise<any> {
    return this.facebook.login(['email']);
  }

  //login using google
  loginWithGoogle(): Promise<any>{
     return this.googlePlus.login({
      'webClientId': '325159181067-9dict7lmn07bniiv6nupl9c18uvqvf1l.apps.googleusercontent.com',
      'offline': false
    })
  }

  //after firebase token retrieved, login with google auth
  loginToFirebaseWithGoogleToken(token): Promise<void>{
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(token)
      return firebase.auth().signInWithCredential(googleCredential)
  }

  //after firebase token retrieved, login with facebook auth
  loginToFirebaseWithFacebookToken(token): Promise<void>{
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(facebookCredential)
  }

  //send reset password link
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //create user in firebase, save user to database
  signupWithEmail(email: string, password: string, firstName: string, lastName: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      newUser.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: ""
      }).then(()=> {
        console.log('succesfully created ew user and saved to database');
      })
    });
  }

  setFirebaseKey(key){
    this.storage.set('auth_key', key)
  }

  getFirebaseKey(){
    return this.storage.get('auth_key')
  }

}
