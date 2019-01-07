import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SaveShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-shopping-list',
  templateUrl: 'save-shopping-list.html',
})
export class SaveShoppingListPage {

  private shopping: Shopping;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.shopping = this.navParams.get("shopping");
  }

  async save_list() {
    const shopping_string: string = "shopping";
    const list_shopping: Shopping[] = await this.storage.get(shopping_string);
    if (list_shopping) {
      list_shopping.push(this.shopping);
      await this.storage.set(shopping_string, list_shopping);
    } else {
      await this.storage.set(shopping_string, [this.shopping]);
    }
    alert("La liste a été enregistrée.");
    await this.navCtrl.goToRoot({})
  }
}
