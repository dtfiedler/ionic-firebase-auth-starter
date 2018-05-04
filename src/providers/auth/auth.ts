// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'

import firebase, { User } from 'firebase'

@Injectable()
export class AuthProvider {

  constructor(
    private googlePlus: GooglePlus,
    public facebook: Facebook) {
  }

  //normal login
  loginWithEmail(email: string, password: string): Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  //logout user
  logoutUser(): Promise<void>  {
     return firebase.auth().signOut()
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


  loginToFirebaseWithGoogleToken(token): Promise<void>{
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(token)
      return firebase.auth().signInWithCredential(googleCredential)
  }

  loginToFirebaseWithFacebookToken(token): Promise<void>{
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(facebookCredential)
  }

  currentUser(){
    return firebase.auth().currentUser
  }
}
