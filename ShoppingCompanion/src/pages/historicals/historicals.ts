import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";
import {PriorisationPage} from "../priorisation/priorisation";

/**
 * Generated class for the HistoricalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historicals',
  templateUrl: 'historicals.html',
})
export class HistoricalsPage {

  shopping : Shopping[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage : Storage, private app : App) {
  }

  async ionViewDidLoad() {
    this.shopping = await this.storage.get("shopping");
  }

  start_shopping(list: Shopping) {
    this.app.getRootNav().push(PriorisationPage, {shopping: list});
  }

}
