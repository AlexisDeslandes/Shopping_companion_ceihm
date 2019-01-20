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

        const aisleWidth = this._CANVAS.width/3;
        const aisleHeight = this._CANVAS.height/10;
        const aisleHorizontalOffset = this._CANVAS.width/9;
        const aisleVerticalOffset = this._CANVAS.height/12;

        // This is not a loop since the aisles are supposed to be placed manually for actual stores (irregular layouts)
        this.drawRect(aisleHorizontalOffset, aisleVerticalOffset, aisleWidth, aisleHeight, "#000", "#717171");
        this.drawRect(aisleHorizontalOffset*2 + aisleWidth, aisleVerticalOffset, aisleWidth, aisleHeight, "#000", "#717171");

        this.drawRect(aisleHorizontalOffset, aisleVerticalOffset*2 + aisleHeight, aisleWidth, aisleHeight, "#000", "#717171");
        this.drawRect(aisleHorizontalOffset*2 + aisleWidth, aisleVerticalOffset*2 + aisleHeight, aisleWidth, aisleHeight, "#000", "#717171");

        this.drawRect(aisleHorizontalOffset, aisleVerticalOffset*3 + aisleHeight*2, aisleWidth, aisleHeight, "#000", "#717171");
        this.drawRect(aisleHorizontalOffset*2 + aisleWidth, aisleVerticalOffset*3 + aisleHeight*2, aisleWidth, aisleHeight, "#000", "#717171");

        this.drawRect(aisleHorizontalOffset, aisleVerticalOffset*4 + aisleHeight*3, aisleWidth, aisleHeight, "#000", "#717171");
        this.drawRect(aisleHorizontalOffset*2 + aisleWidth, aisleVerticalOffset*4 + aisleHeight*3, aisleWidth, aisleHeight, "#000", "#717171");

        this.drawRect(aisleHorizontalOffset, aisleVerticalOffset*5 + aisleHeight*4, aisleWidth, aisleHeight, "#000", "#717171");
        this.drawRect(aisleHorizontalOffset*2 + aisleWidth, aisleVerticalOffset*5 + aisleHeight*4, aisleWidth, aisleHeight, "#000", "#717171");


    }

    drawRect(x, y, w, h, c, f)
    {
        this._CONTEXT.beginPath();
        this._CONTEXT.rect(x, y, w, h);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = c;
        this._CONTEXT.fillStyle = f;
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
        this._CONTEXT.fillStyle = "#fff";
        this._CONTEXT.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    }

    clearCanvas()
    {
        this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
        this.setupCanvas();
    }



}
