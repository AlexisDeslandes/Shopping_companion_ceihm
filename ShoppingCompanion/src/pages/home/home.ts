import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddShoppingListPage} from "../add-shopping-list/add-shopping-list";
import {Storage} from "@ionic/storage";
import {Shopping} from "../../interface/Shopping";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage : Storage) {

  }

  async ionViewDidLoad(){
    const shopping : Shopping[] = await this.storage.get("shopping");
    console.log(shopping);
  }

  async navigate_to_add_shopping_list() {
    await this.navCtrl.push(AddShoppingListPage);
  }
}
