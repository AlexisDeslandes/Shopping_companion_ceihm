import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";
import {PriorisationPage} from "../priorisation/priorisation";
import {ShoppingList} from "../../interface/ShoppingList";

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

  shopping: ShoppingList = new ShoppingList([]);

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private app: App, private alert_ctrl: AlertController) {
  }

  async ionViewDidLoad() {
    this.shopping = new ShoppingList(await this.storage.get("shopping"));
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
