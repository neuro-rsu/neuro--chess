import { ChessElement, html, css } from './chess-element.mjs'

import '../components/button/button.js';
import '../components/icon/icon.js';
import confetti from "https://cdn.skypack.dev/canvas-confetti";

import { litChessStyles } from './lit-chess-css.mjs';

class LitChess extends ChessElement {
    static get properties() {
        return {
            row: { type: Number, default: 8, save: true, category: 'settings' },
            column: { type: Number, default: 8, save: true, category: 'settings' },
            autoClose: { type: Boolean, default: true, category: 'settings' },
            timeToClose: { type: Number, default: 750, category: 'settings' },
            fontSize: { type: Number, default: 32 },
            isOk: { type: Number, default: 0 },
            isError: { type: Number, default: 0 },
            isInit: { type: Boolean, default: true, category: 'settings' },
            step: { type: Number, default: 0 },
            cards: { type: Array },
            card1: { type: Object },
            card2: { type: Object },
            solved: { type: Array, default: [] },
            end: { type: Boolean },
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
        }
    }

    static get styles() {
        return [
            litChessStyles,
            css`
                :host {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100%;
                    box-sizing: border-box;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
            <style>
                .solved { opacity: ${this.end ? 1 : .3}; }
                .cell-front, .cell-back { font-size: ${14 + this.fontSize - 100 <= 14 ? 14 : 14 + this.fontSize - 100}px; }
            </style>
            <header>
                <div style="display: flex; flex-direction: column; flex: 1; width: 100%">
                    <div class='txt' style="width: 100%; ">Lit Chess</div>
                    <div style="display: flex; width: 100%; justify-content: center; align-items: center">
                        <div style="color: green; flex: 1; text-align: right; font-weight: 600; opacity: .5">${this.isOk}</div>
                        <div style="padding: 0 4px"> : </div>
                        <div style="color: red; flex: 1; font-weight: 600; opacity: .5">${this.isError}</div>
                    </div>
                </div>
                <chess-button name='refresh' border='none' size=28 @click=${() => document.location.reload()} title='refresh' style='margin-right: 8px'></chess-button>
                <chess-button name='face' border='none' size=28 @click=${() => this.neuroClick()} title='Нейросеть' style='margin-right: 8px'></chess-button>
                <chess-button name='screenshot' border='none' size=28 @click=${() => this.screenShort()} title='Скриншот' style='margin-right: 8px'></chess-button>
            </header>
            <div id="board" class='board'>
                ${[...Array(+this.row).keys()].map(row => html`
                    <div class='row'>
                        ${[...Array(+this.column).keys()].map(column => {
                            let idx = this.column * row + column;
                            return html`
                                <div class='cell ${(this.solved.includes(idx) || idx === this.card1?.id || idx === this.card2?.id) ? 'selected' : ''} ${this.solved.includes(idx) ? 'solved' : ''}'
                                        @click=${e => this.onclick(e, idx, this.cards?.[idx])}>
                                    <div class='cell-inner'>
                                        <div class='cell-front ${idx === this.odd ? 'odd' : ''}' style="color: hsla(${this.cards?.[idx]?.c || 0}, 60%, 50%, 1);">
                                            ${html`
                                                <img src=${this.cards?.[idx]?.v || this._url + 'images/chess.png'} style="width: 100%;max-height: 100%;">
                                            `}
                                        </div>
                                        <div class='cell-back ${idx === this.odd ? 'odd' : ''}'>
                                            ${idx === this.odd ? html`
                                                <img src=${this._url + 'images/chess.png'} style="width: 100%;max-height: 100%;">
                                            ` : html``}
                                        </div>
                                    </div>
                                </div>
                            `})}
                    </div>
                `)}
            </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        setTimeout(() => this.init(), 100);
        window.addEventListener('resize', () => CHESS.throttle('resize', () => this.fontSize = this._fontSize, 300), false);
    }

    updated(e) {
        if (e.has('row') || e.has('column')) {
            this.row = this.row < 2 ? 2 : this.row > 10 ? 10 : this.row;
            this.column = this.column < 2 ? 2 : this.column > 10 ? 10 : this.column;
        }
        if (e.has('row') || e.has('column')) this.init();
    }
    get _url() { return this.$url.replace('js/chess.js', '') }
    get odd() { return (this.row * this.column) % 2 === 0 ? '' : Math.floor(this.row * this.column / 2) }
    get _fontSize() { return Math.min(this.$qs('#board').offsetWidth / this.column + this.column * 4, this.$qs('#board').offsetHeight / this.row + this.row * 4) }

    // updated(e) {
    //     if (e.has('row') || e.has('column')) {
    //         this.row = this.row < 2 ? 2 : this.row > 10 ? 10 : this.row;
    //         this.column = this.column < 2 ? 2 : this.column > 10 ? 10 : this.column;
    //     }
    //     if (e.has('row') || e.has('column')) this.init();
    // }
    init() {
        this._confetti && clearInterval(this._confetti);
        this.fontSize = this._fontSize;
        this.isOk = this.isError = 0;
        this.card1 = this.card2 = undefined;
        this.solved = [];
        this.cards = [];
        const images = [];
        let url = this._url + 'cards/cards-';
        for (let i = 1; i <= 140; i++) {
            if (i === 1 || i === 17 || i === 72 || i === 140)
            images.push(url + (i < 10 ? '00' + i : i < 100 ? '0' + i : i) + '.jpg');
        }
        let length = (this.row * this.column) - (this.odd ? 1 : 0);
        this.step = 360 / (length / 2);
        let unique = [];
        const uniqueCards = [];
        for (let i = 0; i < length / 2; i++) {
            const color = i * this.step;
            if (unique.length === 0)
                unique = [...Array(images.length).keys()];
            const randomNumber = Math.floor(Math.random() * unique.length);
            const random = images[unique[randomNumber]];
            uniqueCards.push({ v: random, c: color }, { v: random, c: color })
            unique[randomNumber] = unique[unique.length - 1];
            unique.pop();

        }
        this.cards = [];
        while (uniqueCards.length !== 0) {
            const randomNumber = Math.floor(Math.random() * uniqueCards.length);
            this.cards.push(uniqueCards[randomNumber]);
            uniqueCards[randomNumber] = uniqueCards[uniqueCards.length - 1];
            uniqueCards.pop();
        }
        this.odd && this.cards.splice(this.odd, 0, -1);
        this.$update();
        this.isInit = false;
    }
    onclick(e, id, value) {
        if (this.isInit) return;
        if (id === this.odd) {
            this.isInit = true;
            if (this.solved?.length === 0 && this.card1 === undefined) {
                this.init();
            }
            else {
                this.card1 = this.card2 = undefined;
                this.solved = [];
                setTimeout(() => this.init(), 300);
            }
            return;
        };
        if (!this.autoClose && this.card1 && this.card2) this.card1 = this.card2 = undefined;
        if (this.solved.includes(id) || this.card1?.id === id || value.v < 0) return;
        this.clickEffect ||= new Audio(this._url + 'audio/click.mp3');
        this.clickEffect.volume = 0.2;
        this.clickEffect.play();
        if (!this.card1) this.card1 = { id, value };
        else if (!this.card2) {
            this.card2 = { id, value };
            if (this.card1.value.v === this.card2.value.v ) {
                this.solved ||= [];
                setTimeout(() => {
                    if (this.card1 === undefined && this.card1 === undefined)
                        return;
                    ++this.isOk;
                    this.solved.push(this.card1.id, this.card2.id);
                    this.card1 = this.card2 = undefined;
                    this.end = this.solved.length >= this.cards.length - (this.odd ? 2 : 0);
                    if (this.end) {
                        this.endEffect ||= new Audio(this._url + 'audio/end.mp3');
                        this.endEffect.volume = 0.2;
                        this.endEffect.play();
                        function randomInRange(min, max) { return Math.random() * (max - min) + min; }
                        this._confetti = setInterval(() => confetti({ angle: randomInRange(30, 150), spread: randomInRange(50, 70), particleCount: randomInRange(50, 100), origin: { y: .55 } }), 650);
                        setTimeout(() => this._confetti && clearInterval(this._confetti), 2100);
                    } else {
                        this.okEffect ||= new Audio(this._url + 'audio/ok.mp3');
                        this.okEffect.volume = 0.4;
                        this.okEffect.play();
                    }
                }, this.timeToClose);
            } else {
                this.errEffect ||= new Audio(this._url + 'audio/error.mp3');
                this.errEffect.volume = 0.1;
                this.errEffect.play();
                ++this.isError;
                this.autoClose && setTimeout(() => this.card1 = this.card2 = undefined, this.timeToClose);
            }
        }
        this.$update();
    }
    neuroClick() {
        let cells = this.renderRoot.querySelectorAll(".cell");
        const id = Math.floor(Math.random() * cells.length);
        if (id != this.odd)
            cells[id].dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true}));

        //this.onclick(new CustomEvent("onclick", { bubbles: true, composed: true}), 0, this.cards?.[0])
        // cells.forEach(item => {
        //     item.dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true}));
        //     console.log(item);
        // });

    }

    screenShort() {
        html2canvas(document.querySelector('lit-chess')).then(function(canvas) {

            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL();
            link.click();
            link.remove();

            // var kMIMEType = "image/png";

            // var blob = canvas.toBlobHD( callback, "image/png" );

            // var a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style.cssText = "display: none";

            // // createObjectURL() will leak memory.
            // var url = window.URL.createObjectURL(blob);
            // a.href = url;
            // a.download = 'my.png';
            // a.click();
            // window.URL.revokeObjectURL(url);

            // a.parentNode.removeChild(a);

            // document.body.appendChild(canvas);

            // const link = document.createElement('a');
            // link.download = 'download.png';
            // link.href = canvas.toDataURL();
            // link.click();
            // link.delete;
            // canvas.toBlob(function(blob) {
            //      saveAs(blob, "Dashboard.png");
            // });
        });
    }
}

customElements.define("lit-chess", LitChess);



