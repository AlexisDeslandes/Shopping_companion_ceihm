import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";
import {ShoppingList} from "../../interface/ShoppingList";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  shopping: ShoppingList = new ShoppingList([]);
  search_label: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  async ionViewDidLoad() {
    this.shopping = new ShoppingList(await this.storage.get("shopping"));
  }

  onInput() {
    this.shopping.filter(this.search_label);
  }

}
