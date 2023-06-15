import { ChessElement, html, css } from './chess-element.mjs'

import '../components/button/button.js';
import '../components/icon/icon.js';
import '../components/forms/login-form.mjs';
import '../components/forms/game-find-form.mjs';
import { default as wsClient, sendMessage, setDialog, repairDialog, setForm, addGame, sendStep} from './ws-client.mjs'

// import confetti from "https://cdn.skypack.dev/canvas-confetti";

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
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            squares: {type: Array}
        }
    }

    rowStart;
    colStart;
    static get styles() {
        return [
            litChessStyles,
            css`
                :host {
                    position: relative;
                    display: flex;
                    flex-direction: column;cur
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
        this.squares = [[new Set(['br']), new Set(['bn']), new Set(['bb']), new Set(['bq']), new Set(['bk']),  new Set(['bb']),  new Set(['bn']), new Set(['br'])],
                        [new Set(['bp']), new Set(['bp']), new Set(['bp']), new Set(['bp']), new Set(['bp']),  new Set(['bp']),  new Set(['bp']), new Set(['bp'])],
                        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()],
                        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()],
                        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()],
                        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()],
                        [new Set(['wp']), new Set(['wp']), new Set(['wp']), new Set(['wp']), new Set(['wp']),  new Set(['wp']),  new Set(['wp']), new Set(['wp'])],
                        [new Set(['wr']), new Set(['wn']), new Set(['wb']), new Set(['wq']), new Set(['wk']),  new Set(['wb']),  new Set(['wn']), new Set(['wr'])]
                    ]
    }

    render() {
        return html`
            <style>
                .solved { opacity: ${this.end ? 1 : .3}; }
                .square-front, .square-back { font-size: ${14 + this.fontSize - 100 <= 14 ? 14 : 14 + this.fontSize - 100}px; }
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
                <chess-button name='face' border='none' size=28 @click=${() => this.gameFind()} title='Нейросеть' style='margin-right: 8px'></chess-button>
                <chess-button name='screenshot' border='none' size=28 @click=${() => this.screenShort()} title='Скриншот' style='margin-right: 8px'></chess-button>
            </header>
            <login-form></login-form>
            <game-find-form></game-find-form>
            <div id="board" class='board'>
                ${this.squares.map((row, rowIndex) => html`
                    <div class='row'>
                        ${row.map((column, colIndex) => {
                            let idx = 8 * rowIndex + colIndex;
                            return html`
                                <div class='square ${(rowIndex + colIndex) % 2 === 0 ? 'white-square' : 'black-square'}' @click=${e => this.onclick(e, idx, this.cards?.[idx])}>

                                    <div class='square-inner'>
                                        <div class='square-front ${[...this.squares[rowIndex][colIndex]].join(' ')}' draggable=${this.squares[rowIndex][colIndex].size !== 0}
                                            @dragstart=${e => this.dragStart(e, rowIndex, colIndex)} @dragend=${e => this.dragEnd(e, rowIndex, colIndex)}
                                            @dragenter=${e => this.dragEnter(e, rowIndex, colIndex)} @dragleave=${e => this.dragLeave(e, rowIndex, colIndex)}
                                            @dragover=${e => this.dragOver(e, rowIndex, colIndex)} @drop=${e => this.drop(e, rowIndex, colIndex)}>

                                        </div>
                                        <!-- <div class='square-front' @dragenter=${(e) => { this.squares[rowIndex][colIndex] = '1'; this.requestUpdate();}} this.classList.add('over');} @dragend=${(e) => { console.log('drag over', e);}}>
                                            ${ column ? html` <img draggable="true"  @dragstart=${() => { console.log('start drag'); this.requestUpdate();}} @dragend=${() => console.log('stop drag')} src=${'images/pieces/classic/150/'+column+'.png'} style="width: 100%;max-height: 100%;"> `: ''}
                                        </div> -->
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

    dragStart(e, rowIndex, colIndex) {
        this.rowStart = rowIndex;
        this.colStart = colIndex;
        this.squares[rowIndex][colIndex].add('selected');
        //e.dataTransfer.effectAllowed = 'move';
        this.requestUpdate();
    }

    dragEnter(e, rowIndex, colIndex) {
        if (this.squares[rowIndex][colIndex].size === 0) {
            this.squares[rowIndex][colIndex].add((rowIndex + colIndex) % 2 === 0 ? 'white-over' : 'black-over');
            this.requestUpdate();
        }
    }

    dragOver(e, rowIndex, colIndex) {
        if (e.preventDefault) {
            e.preventDefault();
        }
    }

    dragEnd(e, rowIndex, colIndex) {
        this.squares[rowIndex][colIndex].delete('selected');
        this.requestUpdate();
    }

    dragLeave(e, rowIndex, colIndex) {
        this.squares[rowIndex][colIndex].delete((rowIndex + colIndex) % 2 === 0 ? 'white-over' : 'black-over');
        this.requestUpdate();
    }

    drop(e, rowIndex, colIndex) {
        if (this.rowStart === rowIndex && this.colStart === colIndex) {
            return;
        }
        this.squares[this.rowStart][this.colStart].delete('selected');
        this.squares[rowIndex][colIndex].clear();
        [this.squares[rowIndex][colIndex], this.squares[this.rowStart][this.colStart]] = [this.squares[this.rowStart][this.colStart], this.squares[rowIndex][colIndex]]
        this.requestUpdate();
        const step = {
            piece: [...this.squares[rowIndex][colIndex]][0],
            rowStart: this.rowStart,
            colStart: this.colStart,
            rowEnd: rowIndex,
            colEnd: colIndex
        }
        sendStep(step)
    }

    updated(e) {
        if (e.has('row') || e.has('column')) {
            this.row = this.row < 2 ? 2 : this.row > 10 ? 10 : this.row;
            this.column = this.column < 2 ? 2 : this.column > 10 ? 10 : this.column;
        }
        //if (e.has('row') || e.has('column')) this.init();
    }

    get _url() { return this.$url.replace('js/chess.js', '') }

    get odd() { return (this.row * this.column) % 2 === 0 ? '' : Math.floor(this.row * this.column / 2) }

    get _fontSize() { return Math.min(this.$qs('#board').offsetWidth / this.column + this.column * 4, this.$qs('#board').offsetHeight / this.row + this.row * 4) }

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
        // if (this.isInit) return;
        // if (id === this.odd) {
        //     this.isInit = true;
        //     if (this.solved?.length === 0 && this.card1 === undefined) {
        //         this.init();
        //     }
        //     else {
        //         this.card1 = this.card2 = undefined;
        //         this.solved = [];
        //         setTimeout(() => this.init(), 300);
        //     }
        //     return;
        // };
        // if (!this.autoClose && this.card1 && this.card2) this.card1 = this.card2 = undefined;
        // if (this.solved.includes(id) || this.card1?.id === id || value.v < 0) return;
        // this.clickEffect ||= new Audio(this._url + 'audio/click.mp3');
        // this.clickEffect.volume = 0.2;
        // this.clickEffect.play();
        // if (!this.card1) this.card1 = { id, value };
        // else if (!this.card2) {
        //     this.card2 = { id, value };
        //     if (this.card1.value.v === this.card2.value.v ) {
        //         this.solved ||= [];
        //         setTimeout(() => {
        //             if (this.card1 === undefined && this.card1 === undefined)
        //                 return;
        //             ++this.isOk;
        //             this.solved.push(this.card1.id, this.card2.id);
        //             this.card1 = this.card2 = undefined;
        //             this.end = this.solved.length >= this.cards.length - (this.odd ? 2 : 0);
        //             if (this.end) {
        //                 this.endEffect ||= new Audio(this._url + 'audio/end.mp3');
        //                 this.endEffect.volume = 0.2;
        //                 this.endEffect.play();
        //                 function randomInRange(min, max) { return Math.random() * (max - min) + min; }
        //                 this._confetti = setInterval(() => confetti({ angle: randomInRange(30, 150), spread: randomInRange(50, 70), particleCount: randomInRange(50, 100), origin: { y: .55 } }), 650);
        //                 setTimeout(() => this._confetti && clearInterval(this._confetti), 2100);
        //             } else {
        //                 this.okEffect ||= new Audio(this._url + 'audio/ok.mp3');
        //                 this.okEffect.volume = 0.4;
        //                 this.okEffect.play();
        //             }
        //         }, this.timeToClose);
        //     } else {
        //         this.errEffect ||= new Audio(this._url + 'audio/error.mp3');
        //         this.errEffect.volume = 0.1;
        //         this.errEffect.play();
        //         ++this.isError;
        //         this.autoClose && setTimeout(() => this.card1 = this.card2 = undefined, this.timeToClose);
        //     }
        // }
        // this.$update();
    }
    neuroClick() {
        let cells = this.renderRoot.querySelectorAll(".cell");
        const id = Math.floor(Math.random() * cells.length);
        if (id != this.odd)
            cells[id].dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true}));
    }
    gameFind() {
        this.renderRoot.querySelector("game-find-form").open();
    }
    screenShort() {
        this.renderRoot.querySelector("login-form").open();
    }
}

customElements.define("lit-chess", LitChess);



