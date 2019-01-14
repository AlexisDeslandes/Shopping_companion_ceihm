import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";
import {ShoppingList} from "../../interface/ShoppingList";
import {PriorisationPage} from "../priorisation/priorisation";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private alert_ctrl: AlertController,
              private app: App) {

  }

  async ionViewDidLoad() {
    this.shopping = new ShoppingList(await this.storage.get("shopping"));
  }

  onInput() {
    this.shopping.filter(this.search_label);
  }

  start_shopping(list: Shopping) {
    this.app.getRootNav().push(PriorisationPage, {shopping: list});
  }

  async delete_shopping(list: Shopping) {
    const alert = this.alert_ctrl.create({
      message: "Souhaitez-vous supprimer cette liste de course ?",
      buttons: [{
        text: 'Oui',
        handler: () => this.delete(list)
      }, {
        text: 'Non',
        handler: () => {
        }
      }]
    });
    await alert.present();
  }

  private async delete(list: Shopping) {
    this.shopping.delete(list);
    await this.storage.set("shopping", this.shopping.shopping);
  }
}
