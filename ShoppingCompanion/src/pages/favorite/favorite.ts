import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  shopping : Shopping[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage) {

  }

  async ionViewDidLoad() {
    this.shopping = await this.storage.get("shopping");
  }

}
