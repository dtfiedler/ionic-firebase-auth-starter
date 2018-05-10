import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { WelcomePage } from '../pages/welcome/welcome';
import { OtherPage } from '../pages/other/other';
import { AuthProvider } from '../providers/auth/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { MessagePage } from '../pages/messages/messages';
import { DishProvider } from '../providers/dish/dish';
import { ChatProvider } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    LoginPage, 
    IntroPage,
    WelcomePage,
    OtherPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp , {
      mode: "md"
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    LoginPage, 
    IntroPage,
    WelcomePage,
    OtherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GooglePlus,
    Facebook,
    DishProvider,
    ChatProvider
  ]
})
export class AppModule {}
