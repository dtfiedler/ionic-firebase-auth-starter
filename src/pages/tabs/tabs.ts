import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MessagePage } from '../messages/messages';
import { MealsPage } from '../meals/meals';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MealsPage
  tab3Root = MessagePage;
  tab4Root = ContactPage;

  constructor() {

  }
}
