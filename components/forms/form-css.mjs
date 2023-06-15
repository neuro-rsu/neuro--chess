import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

export const formStyles = css`

:host {
    --base-color: grey;

    --night-body: #121212;
    --night-background-color: #121212;

    --header-color: honeydew;
    --header-background-color: grey;
    --background-color: white;

    --form-color: #444;
    --form-border-color: #ddd;
    --form-header-border-color: #ddd;
    --form-outline-color: #999;

    /* --button-color: #04aa6d; */
    --button-color: var(--black-square-background-color);
    --button-white-color: var(--white-square-background-color);

    /* --button-color: --black-square-background-color;#b58863 */
    --tab-color: #999;
    --tab-selected-color: #666;
    --tab-select-border-color: #4cc8f1;

    --cancel-button-color: #f44336;

    --form-background-color: #fefefe;

    --form-header-background-color: #f1f1f1;
    --form-header-color: #f1f1f1;

    --dark-background-color: #121212;

    --dark-color: white;
    --dark-header-color: #252525;
    --dark-input-background-color: #3b3b3b;
    --dark-input-border-color: #ccc;
    --dark-input-color: white;

    --dark-tab-color: #b5b5b5;
    --dark-tab-hover-color: white;
    --dark-tab-focus-color: #b5b5b5;
    --dark-tab-selected-color: white;
    --dark-tab-border-color: #b5b5b5;

    --dark-base: #808080;
    --dark-base-color: #e2e2e2;
    user-select: none;
}

/* The Modal (background) */
.form-background {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    left: 0;
    top: 0;
    z-index: 10000; /* Sit on top */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    padding-top: 60px;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Form Box */
.form {
    width: 80%; /* Could be more or less, depending on screen size */
    max-width: 800px;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid var(--form-border-color);
    border-radius: 10px;
    color: var(--form-color);
    background-color: var(--form-background-color);
}

.form.dark {
    background-color: var(--dark-background-color);
    color: var(--dark-color);
}

/* Center the image and position the close button */
.form-header {
    display: flex;
    position: relative;
    text-align: center;
    padding: 0px 16px 0 16px;
    border-radius: 10px 10px 0 0;
    background-color: var(--form-header-background-color);
    /*border-bottom: solid var(--form-header-border-color) 1px;*/
}

#form.dark .form-header {
    background-color: var(--dark-header-color);
}

.form-body {
    padding: 16px;
}

.form-footer {
    padding: 16px;
    border-radius: 0 0 10px 10px;
    background-color: var(--form-header-background-color);
    overflow: hidden;
}

#form.dark .form-footer {
    background-color: var(--dark-header-color);
    color: var(--dark-color);
}

/* Full-width input fields */
input[type="text"],
input[type="password"],
input[type="number"] {
    display: inline-block;
    width: 100%;
    margin: 8px 0;
    padding: 12px 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    outline-color: var(--form-outline-color);
    color: var(--form-color);
}

#form.dark input[type="text"],
#form.dark input[type="password"],
#form.dark input[type="number"] {
    background-color: var(--dark-input-background-color);
    border-color: var(--dark-input-border-color);
    color: var(--dark-input-color);
    outline-color: var(--form-border-color);
}

#form.dark input:focus-visible {
    outline-color: var(--dark-input-background-color);
}

.lesson,
.topic {
    display: flex;
}

.lesson > input[type="text"],
.topic > input[type="text"] {
    width: 80%;
}

.lesson > input[name="lesson-number"],
.topic > input[name="topic-number"] {
    width: 20%;
    margin-right: 4px;
    text-align: center;
}

.top-distance {
    display: flex;
}

.top-distance > input[type="text"] {
    width: 50%;
    text-align: center;
    margin-right: 4px;
}

.top-distance > input[type="text"]:last-of-type {
    margin-right: 0px;
}

/* Set a style for all buttons */
button {
    width: 100%;
    margin: 8px 0;
    padding: 14px 20px;
    border: none;
    overflow: hidden;
    background-color: var(--button-color);
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
}

.button-king {
    width: 150px;
    height: 150px;
    margin: 8px 0;
    padding: 14px 20px;
    border: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    background-color: inherit;
    background-position: center;
    background-repeat: no-repeat;
}

.button-king.white-king {
    margin-right: 10px;
    background-image: url('../../images/pieces/classic/150/wk.png');
}

.button-king.selected {
    background-color: var(--button-white-color);
}

.button-king.black-king {
    margin-left: 10px;
    background-image: url('../../images/pieces/classic/150/bk.png')
}

.button-king.flash {
    background-color: inherit;
}

.button-king:hover {
    opacity: 1;
    background-color: var(--button-white-color);
}


button:hover {
    opacity: 0.8;
}

.footer-buttons {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.footer-buttons.right {
    justify-content: right;
}

.footer-button {
    width: auto;
    flex: none;
    margin: 4px;
    padding: 10px 18px;
    background-color: var(--button-color);
}

/* Extra styles for the cancel button */
.checkboxes-settings {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: start;
}


.king-select {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}

.checkboxes-settings label {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.checkboxes-settings label > input[type='checkbox']{
    margin-bottom: 10px;
}

/* Extra styles for the radioBox settings */
.radio-boxes-settings {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: start;
    margin-bottom: 10px;
}

.radio-boxes-settings label {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.radio-boxes-settings label > input[type='radio'] {
    margin-bottom: 10px;
}


.form-tab-section label > b  {
    margin-top: 8px;
}

.form-tab-section label:first-of-type > b{
    margin-top: 0px;
}

.form-tab-section label > b {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Extra styles for the cancel button */
.cancel-button {
    margin-right: auto;
    background-color: var(--cancel-button-color);
}

span.psw {
    float: right;
    padding-top: 16px;
}

.form-tabs {
    display: flex;
    flex: auto;
    top: 0;
    left: 0;
    right: 0;
    margin: 10px 0 0;
    padding: 0 12px 0 0;
    overflow: hidden;
    text-align: left;
    border-radius: 3px 3px 0 0;
}

.form-tab {
    position: relative;
    display: flex;
    vertical-align: top;
    bottom: auto;
    margin-top: 3px;
    padding-bottom: 0;
    overflow: hidden;
    line-height: 36px;
    font-weight: normal;
    color: var(--tab-color);
    border: solid var(--form-header-border-color);
    border-width: 1px 1px 1px;
    border-radius: 5px 5px 0 0;
    background: var(--form-background-color);
}

#form.dark .form-tab {
    background: var(--dark-header-color);
}


.form-tab + .form-tab {
    margin-left: -1px;
}

.form-tab.selected {
    bottom: -1px;
    margin-top: 0;
    padding-bottom: 2px;
    line-height: 34px;
    font-weight: bold;
    color: var(--tab-selected-color);
    background: var(--form-background-color);
    border-top: 0;
}

#form.dark .form-tab.selected {
    background: var(--dark-background-color);
    color: var(--dark-tab-selected-color);
}

.form-tab:hover {
    font-weight: bold;
    color: var(--tab-selected-color);
}

#form.dark .form-tab:hover {
    font-weight: bold;
    color: var(--dark-tab-hover-color);
}

.form-tab.selected > .form-tab-link{
    margin: 0 -1px;
    border-top: 4px solid var(--tab-select-border-color);
}

.form-tab-link {
    display: block;
    padding: 0 15px;
    margin: 0;
    border-top: 0;
    color: inherit;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.form-tab-section {
    display: none;
    overflow: hidden;
}

.form-tab-section.selected {
    display: block;
}

.footer-buttons-section {
    display: none;
}

.footer-buttons-section.selected {
    display: block;
}

.no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* The Close Button (x) */
.close-button {
    flex: none;
    right: 20px;
    top: 0;
    color: var(--form-tab-selected-color);
    font-size: 35px;
    font-weight: bold;
}

#form.dark .close-button {
    color: white;
}

.title {
    position: absolute;
    right: 20px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus,
#form.dark .close-button:hover,
#form.dark .close-button:focus {
    color: red;
    cursor: pointer;
}

[placeholder] {
    text-overflow: ellipsis;
}


/* Add Zoom Animation */
.animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s;
}

.animate-close {
    -webkit-animation: animatezoomreverse 0.6s;
    animation: animatezoomreverse 0.6s;
}

@-webkit-keyframes animatezoom {
    from {
        -webkit-transform: scale(0);
    }
    to {
        -webkit-transform: scale(1);
    }
}

@keyframes animatezoom {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}

@-webkit-keyframes animatezoomreverse {
    from {
        background-color: rgba(0, 0, 0, 0.4);
        -webkit-transform: scale(1);
    }
    to {
        background-color: rgba(0, 0, 0, 0);
        -webkit-transform: scale(0);
    }
}

@keyframes animatezoomreverse {
    from {
        /* background-color: rgba(0, 0, 0, 0.4); */
        transform: scale(1);
    }
    to {
        /* background-color: rgba(0, 0, 0, 0); */
        transform: scale(0);
    }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 400px) {
    span.psw {
        display: block;
        float: none;
    }
    .footer-button {
        width: 100%;
    }
}

@media screen and (max-width: 400px) {
    .checkboxes-settings label{
        width: 100%;
    }
}

@media screen and (max-width: 400px) {
    .radio-boxes-settings label{
        width: 100%;
    }
}

@media screen and (max-width: 300px) {
    .top-distance > input[type="text"] {
        width: 100%;
        margin-right: 0px;
    }

    .top-distance {
        flex-wrap: wrap;
    }

    .lesson,
    .topic {
        flex-wrap: wrap;
    }

    .lesson > input[type="text"],
    .topic > input[type="text"] {
        width: 100%;
    }

    .lesson > input[name="lesson-number"],
    .topic > input[name="topic-number"] {
        width: 100%;
        margin-right: 0;
        margin-bottom: 0;
    }

    .lesson > input[type="text"]:last-of-type,
    .topic > input[type="text"]:last-of-type {
        margin-bottom: 8px;
    }
}
`;