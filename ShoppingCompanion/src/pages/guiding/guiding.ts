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

    private shopping: Shopping;
    private priorisation: string;
    private currentItem: any;
    private itemIndex: 0;


    @ViewChild('canvas') canvasElt: ElementRef;
    private _CANVAS: any;
    private _CONTEXT: any;

    private canvasWidth;
    private canvasHeight;
    private coordinates;
    private aisleWidth;
    private aisleHeight;
    private aisleHorizontalOffset;
    private aisleVerticalOffset;
    private offsets;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loading_ctrl: LoadingController, platform: Platform) {
        platform.ready().then((readySource) => {
            this.canvasWidth = platform.width();
            this.canvasHeight = platform.height();
        });

        this.shopping = new Shopping(this.navParams.get("shopping").articles);
        this.currentItem = this.shopping.get_articles()[0];

    }

    async ionViewDidLoad() {

        this.canvasHeight -= document.getElementById("header").offsetHeight + 5;

        this.priorisation = this.navParams.get("priorisation");

        this._CANVAS = this.canvasElt.nativeElement;
        this._CANVAS.width = this.canvasWidth;
        this._CANVAS.height = this.canvasHeight * 0.9;

        this.aisleWidth = this._CANVAS.width / 3;
        this.aisleHeight = this._CANVAS.height / 10;

        this.aisleHorizontalOffset = this._CANVAS.width / 9;
        this.aisleVerticalOffset = this._CANVAS.height / 12;

        this.coordinates = {
            1: [this.aisleHorizontalOffset, this.aisleVerticalOffset],
            2: [this.aisleHorizontalOffset * 2 + this.aisleWidth, this.aisleVerticalOffset],
            3: [this.aisleHorizontalOffset, this.aisleVerticalOffset * 2 + this.aisleHeight],
            4: [this.aisleHorizontalOffset * 2 + this.aisleWidth, this.aisleVerticalOffset * 2 + this.aisleHeight],
            5: [this.aisleHorizontalOffset, this.aisleVerticalOffset * 3 + this.aisleHeight * 2],
            6: [this.aisleHorizontalOffset * 2 + this.aisleWidth, this.aisleVerticalOffset * 3 + this.aisleHeight * 2],
            7: [this.aisleHorizontalOffset, this.aisleVerticalOffset * 4 + this.aisleHeight * 3],
            8: [this.aisleHorizontalOffset * 2 + this.aisleWidth, this.aisleVerticalOffset * 4 + this.aisleHeight * 3],
            9: [this.aisleHorizontalOffset, this.aisleVerticalOffset * 5 + this.aisleHeight * 4],
            10: [this.aisleHorizontalOffset * 2 + this.aisleWidth, this.aisleVerticalOffset * 5 + this.aisleHeight * 4]
        };

        this.offsets = {
            'N': [this.aisleWidth / 2, 0], 'E': [this.aisleWidth, this.aisleHeight / 2],
            'S': [this.aisleWidth / 2, this.aisleHeight], 'W': [0, this.aisleHeight / 2]
        };

        this.initializeCanvas(this.canvasWidth, this.canvasHeight);

        this.drawShop();

    }

    drawPath(start, end) {
        const startAisle = start.split(':')[0];
        const startSide = start.split(':')[1];
        const endAisle = end.split(':')[0];
        const endSide = end.split(':')[1];

        const startConstPoint = this.constPoint(startAisle, startSide);
        const endConstPoint = this.constPoint(endAisle, endSide);

        const startAlleyPoint = this.alleyPoint(startAisle, startSide);
        const endAlleyPoint = this.alleyPoint(endAisle, endSide);

        this.drawLine(this.exactCoordinates(startAisle, startSide), startConstPoint);
        this.drawLine(this.exactCoordinates(endAisle, endSide), endConstPoint);

        this.drawLine(startConstPoint, startAlleyPoint);
        this.drawLine(endConstPoint, endAlleyPoint);

        this.drawLine(startAlleyPoint, endAlleyPoint);
    }

    constPoint(aisle, side) {
        const p = this.exactCoordinates(aisle, side);

        switch (side) {
            case "N":
                return [p[0], p[1] - this.aisleVerticalOffset / 2];
            case "E":
                return [p[0] + this.aisleHorizontalOffset / 2, p[1]];
            case "S":
                return [p[0], p[1] + this.aisleVerticalOffset / 2];
            case "W":
                return [p[0] - this.aisleHorizontalOffset / 2, p[1]];
        }
    }

    alleyPoint(aisle, side) {
        const p = this.exactCoordinates(aisle, side);

        switch (side) {
            case "N":
                if (aisle % 2 == 0) {
                    return [p[0] - this.aisleWidth / 2 - this.aisleHorizontalOffset / 2, p[1] - this.aisleVerticalOffset / 2];
                }
                else {
                    return [p[0] + this.aisleWidth / 2 + this.aisleHorizontalOffset / 2, p[1] - this.aisleVerticalOffset / 2];
                }
            case "S":
                if (aisle % 2 == 0) {
                    return [p[0] - this.aisleWidth / 2 - this.aisleHorizontalOffset / 2, p[1] + this.aisleVerticalOffset / 2];
                }
                else {
                    return [p[0] + this.aisleWidth / 2 + this.aisleHorizontalOffset / 2, p[1] + this.aisleVerticalOffset / 2];
                }
            case "E":
                if (aisle % 2 == 1) {
                    return [p[0] + this.aisleHorizontalOffset / 2, p[1]];
                }
                return [0, 0];
            case "W":
                if (aisle % 2 == 0) {
                    return [p[0] - this.aisleHorizontalOffset / 2, p[1]];
                }
                return [0, 0];
        }
    }


    exactCoordinates(aisle, side) {
        const a = this.coordinates[aisle];
        return [a[0] + this.offsets[side][0], a[1] + this.offsets[side][1]];
    }

    drawLine(a, b) {
        this._CONTEXT.beginPath();
        this._CONTEXT.moveTo(a[0], a[1]);
        this._CONTEXT.lineTo(b[0], b[1]);
        this._CONTEXT.lineWidth = 3;
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

        this.drawPath("1:N", "10:W");

    }

    drawRect(x, y, w, h, c, f) {
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

    setupCanvas() {
        this._CONTEXT = this._CANVAS.getContext('2d');
        this._CONTEXT.fillStyle = "#fff";
        this._CONTEXT.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    }

    clearCanvas() {
        this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
        this.setupCanvas();
    }

    nextItem() {
        if (this.itemIndex < this.shopping.length()) {
            this.itemIndex++;
            this.currentItem = this.shopping.get_articles()[this.itemIndex];
        }
    }

    previousItem() {
        if (this.itemIndex > 0) {
            this.itemIndex--;
            this.currentItem = this.shopping.get_articles()[this.itemIndex];
        }
    }


}
