
import { ChessElement, html, css } from '../../js/chess-element.mjs';

import { formStyles } from './form-css.mjs'

import { default as wsClient, sendMessage, setDialog, repairDialog, setForm, addGame} from '../../js/ws-client.mjs'

import '../dialogs/modal-dialog.mjs';

class GameFindForm extends ChessElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            opened: { type: Boolean, default: false, category: 'settings' },
            defaultPiecesColor: { type: Boolean, default: true},
            defaultFlashKing: { type: Number, default: -1},
            login: { type: String, default: ''},
            password: {type: String, default: ''}
        }
    }

    static get styles() {
        return [
            formStyles,
            css`
                :host {
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
           <div id="form-background" class="form-background" style="${this.opened ? 'display: block' : ''}">
            <modal-dialog></modal-dialog>
            <cancel-dialog></cancel-dialog>
            <close-dialog></close-dialog>
            <form class="form animate" method="post" id="form">
                <div class="form-header">
                    <div class="form-tabs no-select">
                        <div class="form-tab" selected>
                            <span id="db-tab" class="form-tab-link select">Выбор цвета фигур</span>
                        </div>
                    </div>
                    <span id="close" class="close-button no-select" title="Закрыть"  @click=${()=>this.close()}>&times;</span>
                </div>

                <div class="form-body">
                    <div class="form-tab-section selected">
                        <div class="king-select">
                            <button type="button" class="button-king white-king${this.defaultPiecesColor ? ' selected' : ''}${(this.defaultFlashKing === 1) ? ' flash' : ''}" @click=${()=>this.selectGameKind(1)} @mouseenter=${()=>this.flashKing(0)} @mouseleave=${()=>this.unflashKing()}></button>
                            <button type="button" class="button-king black-king${!this.defaultPiecesColor ? ' selected' : ''}${(this.defaultFlashKing === 0) ? ' flash' : ''}" @click=${()=>this.selectGameKind(0)} @mouseenter=${()=>this.flashKing(1)} @mouseleave=${()=>this.unflashKing()}></button>
                        </div>
                    </div>
                </div>

                <div class="form-footer no-select">
                    <div class="footer-buttons-section selected">
                        <div class="footer-buttons right">
                            <button type="button" class="footer-button" @click=${()=>this.findGame()}>Найти игру</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }

    neuroClick() {
        // let cells = this.renderRoot.querySelectorAll(".cell");
        // const id = Math.floor(Math.random() * cells.length);
        // if (id != this.odd)
        //     cells[id].dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true}));
    }
    open() {
        this.opened = true;
        setDialog(this.renderRoot.querySelector('modal-dialog'))
        setForm(this);
    }
    close() {
        this.opened = false
        repairDialog()

    }

    findGame() {
        if (this.defaultPiecesColor)
            sendMessage("whitegame", {})
        else
            sendMessage("blackgame", {})
    }

    async modalDialogShow() {
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show("Подключение прошло удачно");
        if (modalResult === "Ok") {
            this.close();
        }
    }

    updateLoginValue (e) {
        this.login = e.target.value
        console.log(this.login)
    }

    updatePasswordValue (e) {
        this.password = e.target.value
        console.log(this.password)
    }

    selectGameKind(kind) {
        this.defaultPiecesColor = kind === 1
    }

    flashKing(kind) {
        this.defaultFlashKing = kind;
        console.log(this.defaultFlashKing)
    }

    unflashKing() {
        this.defaultFlashKing = -1;
        console.log(this.defaultFlashKing)
    }

    async gameFound(message) {
        console.log(JSON.stringify(message))
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show(message.text);
        message.data.kind = this.defaultPiecesColor;
        if (modalResult === "Ok") {
            addGame(message.data)
            this.close();
        }
    }
}

customElements.define("game-find-form", GameFindForm);