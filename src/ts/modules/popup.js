"use strict";
exports.__esModule = true;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.Popup = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var Popup = /** @class */ (function () {
        function Popup(options) {
            if (options === void 0) { options = {}; }
            this.onLoad = function () { };
            this.onOpen = function () { };
            this.onClose = function () { };
            if (!options.el) {
                throw new Error('No popup root selector');
            }
            if (!options.openers) {
                throw new Error('No popup opener selector/selectors');
            }
            this.options = Object.assign(this, options);
            this.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
            this.openers = typeof options.openers === 'string' ? document.querySelectorAll(options.openers) : options.openers;
            this.closable = options.closable || false;
            this.onInit();
            this.onLoad();
        }
        Popup.prototype.onInit = function () {
            this.initHTML();
            this.initEvents();
        };
        Popup.prototype.initHTML = function () {
            this.el.classList.add('popup');
            this.el.firstElementChild.classList.add('popup__container');
            if (this.closable) {
                var popupClose = document.createElement('a');
                popupClose.href = '#';
                popupClose.classList.add('popup__close-btn');
                this.el.firstElementChild.appendChild(popupClose);
            }
            document.body.appendChild(this.el);
            return this.el;
        };
        Popup.prototype.initEvents = function () {
            this.open();
            this.close();
        };
        Popup.prototype.open = function () {
            var that = this;
            that.openers.forEach(function (popupOpen) {
                popupOpen.addEventListener('click', function (e) {
                    e.preventDefault();
                    that.el.classList.add('active');
                    that.onOpen.call(that, e);
                });
            });
        };
        Popup.prototype.close = function () {
            var that = this;
            document.addEventListener('keydown', function (e) {
                if (e.key === "Escape") {
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                }
            });
            that.el.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__container')) {
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                }
            });
            var popupClose = that.el.querySelector('.popup__close-btn');
            if (popupClose) {
                popupClose.addEventListener('click', function (e) {
                    e.preventDefault();
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                });
            }
        };
        return Popup;
    }());
    return Popup;
}));
