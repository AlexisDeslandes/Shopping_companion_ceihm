import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
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

    shopping: Shopping;
    priorisation: string;


    @ViewChild('canvas') canvasElt: ElementRef;
    private _CANVAS: any;
    private _CONTEXT: any;

    private canvasWidth;
    private canvasHeight;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loading_ctrl: LoadingController, platform: Platform) {
        platform.ready().then((readySource) => {
            this.canvasWidth = platform.width();
            this.canvasHeight = platform.height();
        });
    }

    async ionViewDidLoad() {

        this.canvasHeight -= document.getElementById("header").offsetHeight+5;

        /*let loading = this.loading_ctrl.create({
            content: "Calcul de l'itinéraire"
        });
        await loading.present();*/
        this.shopping = this.navParams.get("shopping");
        this.priorisation = this.navParams.get("priorisation");
        //todo call to API

        this._CANVAS = this.canvasElt.nativeElement;
        this._CANVAS.width = this.canvasWidth;
        this._CANVAS.height = this.canvasHeight;

        this.initializeCanvas(this.canvasWidth, this.canvasHeight);
        this.drawCircle();

    }

    drawCircle()
    {
        this.clearCanvas();
        this._CONTEXT.beginPath();

        // x, y, radius, startAngle, endAngle
        this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 80, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
    }

    initializeCanvas(width, height) {
        if (this._CANVAS.getContext) {
            this.setupCanvas();
        }
    }

    setupCanvas()
    {
        this._CONTEXT = this._CANVAS.getContext('2d');
        this._CONTEXT.fillStyle = "white";
        this._CONTEXT.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
    }

    clearCanvas()
    {
        this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
        this.setupCanvas();
    }



}
