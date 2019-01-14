import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddShoppingListPage} from "../add-shopping-list/add-shopping-list";
import {Storage} from "@ionic/storage";
import {Shopping} from "../../interface/Shopping";
import {ConsultShoppingListPage} from "../consult-shopping-list/consult-shopping-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage : Storage) {

  }

  async ionViewDidLoad(){

  }

  async navigate_to_add_shopping_list() {
    await this.navCtrl.push(AddShoppingListPage);
  }

  async navigate_to_shopping_list() {
    await this.navCtrl.push(ConsultShoppingListPage);
  }
}
