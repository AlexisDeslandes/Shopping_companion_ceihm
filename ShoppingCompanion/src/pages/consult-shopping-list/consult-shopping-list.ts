import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";
import {FavoritePage} from "../favorite/favorite";
import {HistoricalsPage} from "../historicals/historicals";
import {SearchPage} from "../search/search";

/**
 * Generated class for the ConsultShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consult-shopping-list',
  templateUrl: 'consult-shopping-list.html',
})
export class ConsultShoppingListPage {

  favorite = FavoritePage;
  historicals = HistoricalsPage;
  search = SearchPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {

  }

}
