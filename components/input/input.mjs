import { ChessElement, html, css } from '../../js/chess-element.mjs';

import '../icon/icon.mjs'
import '../button/button.mjs'

import styles from './input-css.mjs'

class ChessInput extends ChessElement {
    static get properties() {
        return {
            type: { type: String, default: 'text'},
            required: { type: Boolean, default: false},
            label: { type: String, default: '' },
            _useInfo: { type: Boolean, default: true },
            textAlign: { type: String, default: 'center' },
            name: { type: String, default: '', isIcon: true },
            fill: { type: String, default: '' },
            color: { type: String, default: 'gray' },
            borderColor: { type: String, default: '' },
            back: { type: String, default: '#fdfdfd' },
            size: { type: Number, default: 24 },
            width: { type: String, default: '' },
            height: { type: String, default: '' },
            swh: { type: String, default: '' },
            border: { type: String, default: '1px' },
            radius: { type: String, default: '2px' },
            br: { type: String, default: '' },
            scale: { type: String, default: '0.9' },
            rotate: { type: Number, default: 0 },
            speed: { type: Number, default: 0 },
            blink: { type: Number, default: 0 },
            blval: { type: String, default: '1;0;0;1' },
            padding: { type: String, default: '' },
            toggledClass: { type: String, default: 'none' },
            notoggledClass: { type: String, default: 'notoggled' },
            toggled: { type: Boolean, default: false, reflect: true },
            path: { type: String, default: '' },
            icon: { type: Object, default: undefined }
        }
    }

    static get styles() {
        return [
            styles,
            css`
                :host {
                    display: inline-block;
                    width: 100%;
                    user-select: none;
                }
            `
        ]
    }

    firstUpdated(setPath = false) {
        super.firstUpdated();
        if (this.br) {
            let arr = this.br.split(':');
            this.border = arr[0] || this.border;
            this.radius = arr[1] || this.radius;
        }
        if (this.swh) {
            let arr = this.swh.split(':');
            this.size = arr[0] || this.size;
            this.width = arr[1] || this.width;
            this.height = arr[2] || this.height;
        }
    }
    get _icon() {
        let _icon = '{}';
        this.fill = this.fill || this.color;
        this.size = this.size || this.height || this.width;
        if (this.icon) _icon = JSON.stringify(this.icon);
        return html`<chess-icon class="${this.toggled ? this.toggledClass : this.notoggledClass}" icon=${_icon} name="${this.name}" fill="${this.fill}" size="${this.size}" scale="${this.scale}"
            rotate="${this.rotate}" speed="${this.speed}" blink="${this.blink}" blval="${this.blval}" path="${this.path}"></chess-icon>`;
    }

    get #label() {
        return html`
            <span class="label">${this.label}</span>
        `
    }

    get #icon() {
        return html`
            <chess-icon class="icon" icon="{}" name="lock" fill="${this.fill}" size="${this.size}" scale="1" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></chess-icon>
        `
    }

    updateLoginValue() {
        console.log("111");
    }

    get #button() {
        return html`
            <chess-icon class="button" icon="{}" name="eye-solid" fill="${this.fill}" size="${this.size}" scale="1" rotate="0" speed="0" blink="0" blval="1;0;0;1" toggled path="" @click=${this.updateLoginValue}></chess-icon>
        `
    }
    get #button1() {
        return html`
            <chess-button class="button" icon="{}" name="lock" fill="gray" size="30" scale="1" rotate="0" speed="0" blink="0" toggled blval="1;0;0;1" path=""></chess-button>
        `
    }
    render() {
        return html`
            ${this.label ? this.#label : ''}
            <div class="input-group">
                <input type=${this.type}
                    placeholder=${this.placeholder}
                    ${this.required ? 'required' : ''}
                    class=""
                    .value=${this.login} @change=${this.updateLoginValue}>
                ${this.#icon}
                ${this.#button1}
            </div>
        `;
    }
};

customElements.define("chess-input", ChessInput);