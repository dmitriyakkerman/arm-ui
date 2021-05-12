import {define} from "../globals/globals";
import {PopupInterface} from "../interfaces/PopupInterface";
import {PopupOptions} from "../types/PopupOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root!.Popup = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Popup implements PopupInterface {
        public options: PopupOptions;

        constructor(options:PopupOptions) {

            if (!options.el) {
                throw new Error('No popup root selector')
            }
            if (!options.openers) {
                throw new Error('No popup openers')
            }

            this.options = options;
            this.options.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
            this.options.openers = typeof options.openers === 'string' ? document.querySelectorAll(options.openers) : options.openers;
            this.options.closable = options.closable || false;
            this.onInit();
            this.onLoad();
        }

        protected onInit(): void {
            this.initHTML();
            this.initEvents();
            this.initCloseIcon();
        }

        protected onLoad(): void {
            if(this.options && (this.options.onLoad as Function)) {
                this.options.onLoad!();
            }
        }

        private initHTML(): HTMLElement {
            this.options.el.classList.add('popup');
            this.options.el.firstElementChild.classList.add('popup__container');

            if (this.options.closable) {
                let popupClose = document.createElement('button');
                popupClose.classList.add('popup__close-btn');
                this.options.el.firstElementChild.appendChild(popupClose);
            }

            document.body.appendChild(this.options.el);

            return this.options.el;
        }

        protected initEvents(): void {
            this.open();
            this.close();
        }

        protected initCloseIcon(): void {
            if(this.options.closable && this.options.closeIcon) {
                let closeBtn = this.options.el.querySelector('.popup__close-btn');
                closeBtn.innerHTML = this.options.closeIcon;
            }
        }

        public open(): void {
            let that = this;

            that.options.openers.forEach(function (popupOpen:HTMLElement) {
                popupOpen.addEventListener('click', function (e: Event) {
                    e.preventDefault();
                    that.options.el.classList.add('active');
                    if(that.options.onOpen) {
                        that.options.onOpen.call(that);
                    }
                })
            })
        }

        public close(): void {
            let that = this;

            document.addEventListener('keydown', function(e: KeyboardEvent) {
                if(e.key === "Escape") {
                    that.options.el.classList.remove('active');

                    if(that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                }
            });

            that.options.el.addEventListener('click', function (e: Event) {

                if (!(e.target! as Element).closest('.popup__container')) {
                    that.options.el.classList.remove('active');

                    if(that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                }
            });

            let popupClose = that.options.el.querySelector('.popup__close-btn');

            if (popupClose) {
                popupClose.addEventListener('click', function (e: Event) {
                    e.preventDefault();
                    that.options.el.classList.remove('active');

                    if(that.options.onClose) {
                        that.options.onClose.call(that);
                    }
                })
            }
        }

        public manualOpen() {
            this.options.el.classList.add('active');
        }

        public manualClose() {
            this.options.el.classList.remove('active');
        }
    }

    return Popup;
}));