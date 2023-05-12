import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

export const litChessStyles = css`
    
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
    .cell {
        display: flex;
        flex: 1;
        margin: calc(1px + 1vmin/2);
        background-color: transparent;
        perspective: 1000px;
        cursor: pointer;
    }
    .cell-inner {
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
    .selected .cell-inner {
        transform: rotateY(180deg);
    }
    .cell-front, .cell-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        font-weight: 500;
    }
    .cell-back {
        background-color: #bbb;
        color: black;
    }
    .cell-front {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        background-color: white;
        transform: rotateY(180deg);
    }
    .odd {
        color: transparent;
        font-size: 0;
        opacity: 1;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: default;
    }
`;