import {Injectable} from '@angular/core';
import { CaptchaSettingModel } from '@wvs-play-win-workspace/shared/types';


@Injectable()
export class CaptchaService {
    private readonly possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    private _settings: any = {};
    private readonly defaults: CaptchaSettingModel = new CaptchaSettingModel();

    constructor() {
        this.defaults = {
            text: null,
            randomText: true,
            randomColours: true,
            width: 300,
            height: 150,
            colour1: null,
            colour2: null,
            font: 'bold 48px "Comic Sans MS", cursive, sans-serif',
        };
    }

    static getCanvas() {
        const canvas = <HTMLCanvasElement> document.getElementById('game');
        return canvas.getContext('2d');
    }

    static _generateRandomColour() {
        const a = Math.random() * 254;
        const b = Math.floor(a / 8) * 8;
        return 'rgb(' + b + ',' + b + ',' + b + ')';
    }

    static convertCanvasToImage(canvas) {
        const image = new Image();
        image.src = canvas.toDataURL('image/png');
        return image.src;
    }

    public generate(string) {
        const context = CaptchaService.getCanvas();
        this._settings = this.defaults;
        this._settings.text = string;
        // if there's no text, set the flag to randomly generate some
        if (string === null || string === '' || string === undefined) {
            this._settings.randomText = true;
        } else {
            this._settings.text = string;
        }
        if (this._settings.randomColours) {
            this._settings.colour1 = CaptchaService._generateRandomColour();
            this._settings.colour2 = CaptchaService._generateRandomColour();
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, this._settings.width, this._settings.height);
        const gradient1 = context.createLinearGradient(0, 0, this._settings.width, 0);
        gradient1.addColorStop(0, this._settings.colour1);
        gradient1.addColorStop(1, this._settings.colour2);
        context.font = this._settings.font;
        context.fillStyle = gradient1;
        const textWidth = context.measureText(this._settings.text).width;
        context.fillText(this._settings.text, this._settings.width / 2 - textWidth / 2, this._settings.height / 2);
        context.setTransform(1, 0, 0, 1, 0, 0);
        const numRandomCurves = 3;
        for (let i = 0; i < numRandomCurves; i++) {
            this._drawRandomCurve();
        }
        return context;
    }

    public generateRandomText() {
        let string = '';
        const length = 5;
        for (let i = 0; i < length; i++) {
            string += this.possibleCharacters.charAt(Math.floor(Math.random() * this.possibleCharacters.length));
        }
        return string;
    }

    private _drawRandomCurve() {

        const ctx = CaptchaService.getCanvas();

        const gradient1 = ctx.createLinearGradient(0, 0, this._settings.width, 0);
        gradient1.addColorStop(0, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);
        gradient1.addColorStop(1, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);

        ctx.lineWidth = Math.floor((Math.random() * 4) + 2);
        ctx.strokeStyle = gradient1;
        ctx.beginPath();
        ctx.moveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
        ctx.bezierCurveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
            Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
            Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
        ctx.stroke();
    }
}
