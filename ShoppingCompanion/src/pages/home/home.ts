import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddShoppingListPage} from "../add-shopping-list/add-shopping-list";
import {Storage} from "@ionic/storage";
import {Shopping} from "../../interface/Shopping";
import {ConsultShoppingListPage} from "../consult-shopping-list/consult-shopping-list";
import {ShoppingList} from "../../interface/ShoppingList";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  async ionViewDidLoad() {

  }

  async navigate_to_add_shopping_list() {
    await this.navCtrl.push(AddShoppingListPage);
  }

  async navigate_to_shopping_list() {
    if (new ShoppingList(await this.storage.get("shopping")).shopping.length !== 0) {
      await this.navCtrl.push(ConsultShoppingListPage);
    } else {
      alert("Veuillez créer au moins une liste au préalable.");
    }
  }
}
