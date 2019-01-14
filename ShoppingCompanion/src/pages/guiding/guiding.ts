import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";

/**
 * Generated class for the GuidingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guiding',
  templateUrl: 'guiding.html',
})
export class GuidingPage {

  shopping : Shopping;
  priorisation : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loading_ctrl : LoadingController) {
  }

  async ionViewDidLoad() {
    let loading = this.loading_ctrl.create({
      content:"Calcul de l'itinéraire"
    });
    await loading.present();
    this.shopping = this.navParams.get("shopping");
    this.priorisation = this.navParams.get("priorisation");
    //todo call to API
    //await loading.dismiss();
  }

}
