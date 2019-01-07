import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddShoppingListPage} from "../add-shopping-list/add-shopping-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  async navigate_to_add_shopping_list() {
    await this.navCtrl.push(AddShoppingListPage);
  }
}
