import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Shopping} from "../../interface/Shopping";
import {EndGuidingPage} from "../end-guiding/end-guiding";

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
    private itemIndex = 0;


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
                platform: Platform) {
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
            'S': [this.aisleWidth / 2, this.aisleHeight], 'O': [0, this.aisleHeight / 2]
        };

        this.initializeCanvas();
        this.drawShop();
        this.drawPath("entrance", this.currentItem.position);
    }

    drawPath(start, end) {
        let startAisle, startSide;
        if (start !== "entrance")
        {
            startAisle = start.split(':')[0];
            startSide = start.split(':')[1];
        }
        else {
            startAisle = "entrance";
            startSide = "entrance";
        }
        let endAisle = end.split(':')[0];
        let endSide = end.split(':')[1];

        // Cheap fix for exterior sides
        if (parseInt(startAisle) % 2 === 0 && startSide === "E")
            startSide = "N";
        if (parseInt(endAisle) % 2 === 0 && endSide === "E")
            endSide = "N";
        if (parseInt(startAisle) % 2 === 1 && startSide === "O")
            startSide = "N";
        if (parseInt(endAisle) % 2 === 1 && endSide === "O")
            endSide = "N";

        const startConstPoint = this.constPoint(startAisle, startSide);
        const endConstPoint = this.constPoint(endAisle, endSide);

        const startAlleyPoint = this.alleyPoint(startAisle, startSide);
        const endAlleyPoint = this.alleyPoint(endAisle, endSide);

        this.drawLine(this.exactCoordinates(startAisle, startSide), startConstPoint);
        this.drawLine(this.exactCoordinates(endAisle, endSide), endConstPoint);

        if (startAisle !== endAisle || startSide !== endSide) {
            if (!(parseInt(startAisle) === parseInt(endAisle)-2 && startSide === "S" && endSide === "N") &&
                !(parseInt(startAisle) === parseInt(endAisle)+2 && startSide === "N" && endSide === "S")) {
                if (!(startAisle === "entrance" && endAisle === "1" && endSide === "N"))
                {
                    this.drawLine(startConstPoint, startAlleyPoint);
                    this.drawLine(endConstPoint, endAlleyPoint);
                    this.drawLine(startAlleyPoint, endAlleyPoint);
                }
            }
        }

        this.drawArrow(this.exactCoordinates(endAisle, endSide), endSide);
        this.drawStart(this.exactCoordinates(startAisle, startSide));

    }

    drawStart(pos) {
        const startSize = this.aisleHeight/10;
        this._CONTEXT.fillStyle = '#005af1';
        this._CONTEXT.beginPath();
        this._CONTEXT.arc(pos[0], pos[1], startSize, 0, 2 * Math.PI);
        this._CONTEXT.fill();
    }

    drawArrow(pos, direction) {
        const arrowSize = this.aisleHeight/5;
        switch (direction) {
            case "N":
                this.drawLine([pos[0], pos[1]], [pos[0]+arrowSize, pos[1]-arrowSize]);
                this.drawLine([pos[0], pos[1]], [pos[0]-arrowSize, pos[1]-arrowSize]);
                break;
            case "O":
                this.drawLine([pos[0], pos[1]], [pos[0]-arrowSize, pos[1]-arrowSize]);
                this.drawLine([pos[0], pos[1]], [pos[0]-arrowSize, pos[1]+arrowSize]);
                break;
            case "E":
                this.drawLine([pos[0], pos[1]], [pos[0]+arrowSize, pos[1]-arrowSize]);
                this.drawLine([pos[0], pos[1]], [pos[0]+arrowSize, pos[1]+arrowSize]);
                break;
            case "S":
                this.drawLine([pos[0], pos[1]], [pos[0]-arrowSize, pos[1]+arrowSize]);
                this.drawLine([pos[0], pos[1]], [pos[0]+arrowSize, pos[1]+arrowSize]);
                break;
        }
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
            case "O":
                return [p[0] - this.aisleHorizontalOffset / 2, p[1]];
            case "entrance":
                return [p[0] + this.aisleWidth / 2, p[1]];
        }
    }

    alleyPoint(aisle, side) {
        const p = this.exactCoordinates(aisle, side);

        switch (side) {
            case "N":
                if (parseInt(aisle) % 2 == 0) {
                    return [p[0] - this.aisleWidth / 2 - this.aisleHorizontalOffset / 2, p[1] - this.aisleVerticalOffset / 2];
                }
                else {
                    return [p[0] + this.aisleWidth / 2 + this.aisleHorizontalOffset / 2, p[1] - this.aisleVerticalOffset / 2];
                }
            case "S":
                if (parseInt(aisle) % 2 == 0) {
                    return [p[0] - this.aisleWidth / 2 - this.aisleHorizontalOffset / 2, p[1] + this.aisleVerticalOffset / 2];
                }
                else {
                    return [p[0] + this.aisleWidth / 2 + this.aisleHorizontalOffset / 2, p[1] + this.aisleVerticalOffset / 2];
                }
            case "E":
                if (parseInt(aisle) % 2 == 1) {
                    return [p[0] + this.aisleHorizontalOffset / 2, p[1]];
                }
                return [p[0] + this.aisleHorizontalOffset / 2, p[1]]; // A CHANGER
            case "O":
                if (parseInt(aisle) % 2 == 0) {
                    return [p[0] - this.aisleHorizontalOffset / 2, p[1]];
                }
                return [p[0] + this.aisleHorizontalOffset / 2, p[1]]; // A CHANGER
            case "entrance":
                return [p[0] + this.aisleWidth + this.aisleHorizontalOffset/2, p[1]];
        }
    }


    exactCoordinates(aisle, side) {
        if (aisle === "entrance")
            return [5+this.aisleHeight/1.5, 5+this.aisleHeight/3];
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

        const imgSize = this.aisleHeight/1.5;

        this._CONTEXT.drawImage(document.getElementById("entrance"),
            5, 5, imgSize, imgSize);

        let tenPercentReducedCanvas = this.canvasHeight - this.getPercent(this.canvasHeight,10);

        this.drawRect(1,1,15,15,"#000","#ffffff");
        this.drawRect(this.canvasWidth - 16,1,15,15,"#000","#648e59");
        this.drawRect(1,tenPercentReducedCanvas -  17,15,15,"#000","#a0a0a0");
        this.drawRect(this.canvasWidth - 16,tenPercentReducedCanvas - 17,15,15,"#000","#8e5959");

        this.drawRect(1,this.aisleVerticalOffset * 2 + (this.aisleHeight/2),15,15,"#000","#4168f4");
        this.drawRect(1,this.aisleVerticalOffset * 3 + (this.aisleHeight * 1.5) ,15,15,"#000","#f441df");
        this.drawRect(1,this.aisleVerticalOffset * 4 + this.aisleHeight * 2.5,15,15,"#000","#f4b841");
        this.drawRect(1,this.aisleVerticalOffset * 5 + this.aisleHeight * 3.5,15,15,"#000","#61f441");

        this.drawRect(this.canvasWidth - 16,this.aisleVerticalOffset * 2 + (this.aisleHeight/2),15,15,"#000","#ffcce2");
        this.drawRect(this.canvasWidth - 16,this.aisleVerticalOffset * 3 + (this.aisleHeight * 1.5) ,15,15,"#000","#f1f441");
        this.drawRect(this.canvasWidth - 16,this.aisleVerticalOffset * 4 + this.aisleHeight * 2.5,15,15,"#000","#f44341");
        this.drawRect(this.canvasWidth - 16,this.aisleVerticalOffset * 5 + this.aisleHeight * 3.5,15,15,"#000","#41f4e8");

        for (let i = 1; i <= 10; i++) {
            this.drawRect(this.coordinates[i][0], this.coordinates[i][1], this.aisleWidth, this.aisleHeight, "#000", "#dadada");
            this._CONTEXT.drawImage(document.getElementById("aisleImg"+i),
                this.coordinates[i][0]+this.aisleWidth/2-imgSize/2, this.coordinates[i][1]+this.aisleHeight/2-imgSize/2, imgSize, imgSize);
        }
    }

    drawRect(x, y, w, h, c, f) {
        this._CONTEXT.beginPath();
        this._CONTEXT.rect(x, y, w, h);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = c;
        this._CONTEXT.fillStyle = f;
        this._CONTEXT.fill();
        this._CONTEXT.stroke();
    }

    initializeCanvas() {
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
            if (this.itemIndex === this.shopping.length()) {
                this.navCtrl.push(EndGuidingPage);
            }
            else {
                this.currentItem = this.shopping.get_articles()[this.itemIndex];
                this.clearCanvas();
                this.drawShop();
                this.drawPath(this.shopping.get_articles()[this.itemIndex-1].position, this.currentItem.position);
            }
        }
    }

    previousItem() {
        if (this.itemIndex > 0) {
            this.itemIndex--;
            this.currentItem = this.shopping.get_articles()[this.itemIndex];
            this.clearCanvas();
            this.drawShop();
            if (this.itemIndex > 0) {
                this.drawPath(this.shopping.get_articles()[this.itemIndex-1].position, this.currentItem.position);
            }
            else {
                this.drawPath("entrance", this.currentItem.position);
            }
        }
    }

    getPercent(total, percent){
      return (total * percent)/100;
  }
}
