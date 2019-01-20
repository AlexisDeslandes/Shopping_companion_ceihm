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
    private coordinates;
    private aisleWidth;
    private aisleHeight;

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

        this.aisleWidth = this._CANVAS.width/3;
        this.aisleHeight = this._CANVAS.height/10;

        const aisleHorizontalOffset = this._CANVAS.width/9;
        const aisleVerticalOffset = this._CANVAS.height/12;

        this.coordinates = {1: [aisleHorizontalOffset, aisleVerticalOffset], 2: [aisleHorizontalOffset*2 + this.aisleWidth, aisleVerticalOffset],
            3: [aisleHorizontalOffset, aisleVerticalOffset*2 + this.aisleHeight], 4: [aisleHorizontalOffset*2 + this.aisleWidth, aisleVerticalOffset*2 + this.aisleHeight],
            5: [aisleHorizontalOffset, aisleVerticalOffset*3 + this.aisleHeight*2], 6: [aisleHorizontalOffset*2 + this.aisleWidth, aisleVerticalOffset*3 + this.aisleHeight*2],
            7: [aisleHorizontalOffset, aisleVerticalOffset*4 + this.aisleHeight*3], 8: [aisleHorizontalOffset*2 + this.aisleWidth, aisleVerticalOffset*4 + this.aisleHeight*3],
            9: [aisleHorizontalOffset, aisleVerticalOffset*5 + this.aisleHeight*4], 10: [aisleHorizontalOffset*2 + this.aisleWidth, aisleVerticalOffset*5 + this.aisleHeight*4]}



        this.initializeCanvas(this.canvasWidth, this.canvasHeight);

        this.drawShop();

    }

    drawPath(start, end) {
        let startAisle = start.split(':')[0];
        let startSide = start.split(':')[1];
        let endAisle = end.split(':')[0];
        let endSide = end.split(':')[1];

        console.log(startAisle, startSide, endAisle, endSide);

        this.drawLine(this.coordinates[startAisle], this.coordinates[endAisle]);

    }

    drawLine(a, b)
    {
        this._CONTEXT.beginPath();
        this._CONTEXT.moveTo(a[0], a[1]);
        this._CONTEXT.lineTo(b[0], b[1]);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = '#005af1';
        this._CONTEXT.stroke();
    }

    drawShop() {

        // This is not a loop since the aisles are supposed to be placed manually for actual stores (irregular layouts)
        this.drawRect(this.coordinates[1][0], this.coordinates[1][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");
        this.drawRect(this.coordinates[2][0], this.coordinates[2][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");

        this.drawRect(this.coordinates[3][0], this.coordinates[3][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");
        this.drawRect(this.coordinates[4][0], this.coordinates[4][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");

        this.drawRect(this.coordinates[5][0], this.coordinates[5][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");
        this.drawRect(this.coordinates[6][0], this.coordinates[6][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");

        this.drawRect(this.coordinates[7][0], this.coordinates[7][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");
        this.drawRect(this.coordinates[8][0], this.coordinates[8][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");

        this.drawRect(this.coordinates[9][0], this.coordinates[9][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");
        this.drawRect(this.coordinates[10][0], this.coordinates[10][1], this.aisleWidth, this.aisleHeight, "#000", "#717171");

        this.drawPath("1:N", "5:S");

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
