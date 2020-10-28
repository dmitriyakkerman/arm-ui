"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals/globals");
(function (root, factory) {
    if (typeof globals_1.define === 'function' && globals_1.define.amd) {
        globals_1.define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.Popup = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class Popup {
        constructor(options) {
            if (!options.el) {
                throw new Error('No popup root selector');
            }
            if (!options.openers) {
                throw new Error('No popup openers');
            }
            this.options = options;
            this.options.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
            this.options.openers = typeof options.openers === 'string' ? document.querySelectorAll(options.openers) : [options.openers];
            this.options.closable = options.closable || false;
            this.onInit();
            this.onLoad();
        }
        onInit() {
            this.initHTML();
            this.initEvents();
        }
        onLoad() {
            if (this.options && this.options.onLoad) {
                this.options.onLoad();
            }
        }
        initHTML() {
            this.options.el.classList.add('popup');
            this.options.el.firstElementChild.classList.add('popup__container');
            if (this.options.closable) {
                let popupClose = document.createElement('a');
                popupClose.href = '#';
                popupClose.classList.add('popup__close-btn');
                this.options.el.firstElementChild.appendChild(popupClose);
            }
            document.body.appendChild(this.options.el);
            return this.options.el;
        }
        initEvents() {
            this.open();
            this.close();
        }
        open() {
            let that = this;
            that.options.openers.forEach(function (popupOpen) {
                popupOpen.addEventListener('click', function (e) {
                    e.preventDefault();
                    that.options.el.classList.add('active');
                    if (that.options.onOpen) {
                        that.options.onOpen.call(that);
                    }
                });
            });
        }
        close() {
            let that = this;
            document.addEventListener('keydown', function (e) {
                if (e.key === "Escape") {
                    that.options.el.classList.remove('active');
                    if (that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                }
            });
            that.options.el.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__container')) {
                    that.options.el.classList.remove('active');
                    if (that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                }
            });
            let popupClose = that.options.el.querySelector('.popup__close-btn');
            if (popupClose) {
                popupClose.addEventListener('click', function (e) {
                    e.preventDefault();
                    that.options.el.classList.remove('active');
                    if (that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                });
            }
        }
        manualOpen() {
            this.options.el.classList.add('active');
        }
        manualClose() {
            this.options.el.classList.remove('active');
        }
    }
    return Popup;
}));
