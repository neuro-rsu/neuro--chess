
import { ChessElement, html, css } from '../../js/chess-element.mjs';

import { formStyles } from './game-fine-dialog-css.mjs'

class GameFindDialog extends ChessElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            message: { type: String, default: 'Модальное окно'},
            opened: { type: Boolean, default: false},
            animateClose: { type: Boolean, default: false}
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
            <div id="dialog" class="modal-dialog ${this.opened ? 'show': ''} ${this.animateClose ? 'animate-close': ''}">
                <div class="modal-dialog-content animate" id="modal-dialog">
                    <div class="dialog-header">
                        <span id="dialog-title" class="dialog-title no-select">Сообщение</span>
                        <span id="dialog-button-close" class="dialog-button-close no-select" title="Закрыть" @click=${()=>this.close()}>&times;</span>
                    </div>

                    <div class="dialog-body">
                        <span id="message" class="no-select">${this.message}</span>
                    </div>

                    <div class="dialog-footer no-select">
                        <div class="footer-buttons">
                            <button type="button" id="ok-button" class="footer-button btn-ok" @click=${()=>this.ok()}>Найти</button>
                            <button type="button" id="button-cancel" class="footer-button button-cancel" @click=${()=>this.close()}>Отменить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }

    dialogResult

    show(message) {
        this.message = message;
        this.opened = true;
        return new Promise( (resolve, reject) => {
            this.dialogResult = resolve;
        })
    }

    ok() {
        this.dialogResult('Ok');
        this.opened = false;
    }

    close() {
        this.opened = false;
        this.dialogResult('Close');
    }
}

customElements.define("game-find-dialog", GameFindDialog);