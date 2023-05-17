import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

export const litChessStyles = css`
    :host {
        --white-square-background-color: #f0d9b5;
        --black-square-background-color: #b58863;
        --white-king-background-image: url('./images/pieces/classic/150/wk.png');
        --white-queen-background-image: url('./images/pieces/classic/150/wq.png');
        --white-rook-background-image: url('./images/pieces/classic/150/wr.png');
        --white-knight-background-image: url('./images/pieces/classic/150/wn.png');
        --white-bishop-background-image: url('./images/pieces/classic/150/wb.png');
        --white-pawn-background-image: url('./images/pieces/classic/150/wp.png');
        --black-king-background-image: url('./images/pieces/classic/150/bk.png');
        --black-queen-background-image: url('./images/pieces/classic/150/bq.png');
        --black-rook-background-image: url('./images/pieces/classic/150/br.png');
        --black-knight-background-image: url('./images/pieces/classic/150/bn.png');
        --black-bishop-background-image: url('./images/pieces/classic/150/bb.png');
        --black-pawn-background-image: url('./images/pieces/classic/150/bp.png');
    }

    header {
        position: absolute;
        top: 0;
        max-width: 100%;
        min-width: 100%;
        display: flex;
        flex: 1;
        align-items: center;
        border-bottom: 1px solid lightgray;
        padding: 2px;
        z-index: 9;
        max-height: 44px;
        overflow: hidden;
        overflow-x: auto;
        box-sizing: border-box;

    }

    .txt {
        border: none;
        outline: none;
        text-align: center;
        font-size: 22px;
        color: gray;
        white-space:nowrap;
    }

    .board {
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;
        background-color: lightgray;
        border: 1px solid darkgray;
        width: 95vmin;
        max-height: 95vmin;
        position: relative;
        flex: 1;
        margin: 64px 8px 16px 8px;
        padding: 5px;
        overflow: hidden;
    }

    .row {
        display: flex;
        flex: 1;

    }

    .square {
        display: flex;
        flex: 1;
        margin: calc(1px + 1vmin/2);
        background-color: var(--white-square-background-color);
        perspective: 1000px;
    }

    .black-square {
        background-color: var(--black-square-background-color);
    }

    .white-square {
        background-color: var(--white-square-background-color);
    }

    .wk {
        cursor: pointer;
        background-image: var(--white-king-background-image);
    }

    .wq {
        background-image: var(--white-queen-background-image);
        cursor: pointer;
    }

    .wr {
        background-image: var(--white-rook-background-image);
        cursor: pointer;
    }

    .wn {
        background-image: var(--white-knight-background-image);
        cursor: pointer;
    }

    .wb {
        background-image: var(--white-bishop-background-image);
        cursor: pointer;
    }

    .wp {
        background-image: var(--white-pawn-background-image);
        cursor: pointer;
    }

    .bk {
        background-image: var(--black-king-background-image);
        cursor: pointer;
    }

    .bq {
        background-image: var(--black-queen-background-image);
        cursor: pointer;
    }

    .br {
        background-image: var(--black-rook-background-image);
        cursor: pointer;
    }

    .bn {
        background-image: var(--black-knight-background-image);
        cursor: pointer;
    }

    .bb {
        background-image: var(--black-bishop-background-image);
        cursor: pointer;
    }

    .bp {
        background-image: var(--black-pawn-background-image);
        cursor: pointer;
    }

    .square-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        position: relative;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border: 1px solid darkgray;
    }


    .square-inner .white-over {
        border: 5px solid white;
    }

    .square-inner .black-over {
        border: 5px solid gray;
    }

    .square-front {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        font-weight: 500;
        background-size: 100% 100%;
    }

    .square-front {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .square-front.selected {
        opacity: 50%;
    }
`;