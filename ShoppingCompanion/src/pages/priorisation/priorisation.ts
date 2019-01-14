import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";

/**
 * Generated class for the PriorisationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-priorisation',
  templateUrl: 'priorisation.html',
})
export class PriorisationPage {

  shopping: Shopping;
  priorisation: string;
  options: string[] = ["Chaîne du froid", "Poids", "Chemin le plus rapide"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.shopping = this.navParams.get("shopping");
    this.priorisation = this.options[0];
  }

}
