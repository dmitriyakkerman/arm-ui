import {PopupOptions} from "../types/PopupOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Popup = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Popup {

        public options: object;
        public el: any;
        public openers: any;
        public closable: boolean;
        public onLoad: any;
        public onOpen: any;
        public onClose: any;

        constructor(options:PopupOptions = {}) {

            Object.assign({
                onLoad: function() {},
                onOpen: function () {},
                onClose: function () {}
            }, options);

            if (!options.el) {
                throw new Error('No popup root selector')
            }

            if (!options.openers) {
                throw new Error('No popup opener selector/selectors')
            }

            this.options = options;
            this.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
            this.openers = typeof options.openers === 'string' ? document.querySelectorAll(options.openers) : options.openers;
            this.closable = options.closable || false;
            this.onInit();
            this.onLoad = options.onLoad();
            this.onOpen = options.onOpen;
            this.onClose = options.onClose;
        }

        protected onInit() :void {
            this.initHTML();
            this.initEvents();
        }

        private initHTML() :HTMLElement {
            this.el.classList.add('popup');
            this.el.firstElementChild.classList.add('popup__container');

            if (this.closable) {
                let popupClose = document.createElement('a');
                popupClose.href = '#';
                popupClose.classList.add('popup__close-btn');
                this.el.firstElementChild.appendChild(popupClose);
            }

            document.body.appendChild(this.el);

            return this.el;
        }

        protected initEvents() :void {
            this.open();
            this.close();
        }

        public open() :void {

            let that = this;

            that.openers.forEach(function (popupOpen:HTMLElement) {
                popupOpen.addEventListener('click', function (e) {
                    e.preventDefault();
                    that.el.classList.add('active');

                    that.onOpen.call(that, e);
                })
            })
        }

        public close() {

            let that = this;

            document.addEventListener('keydown', function(e) {
                if(e.key === "Escape") {
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                }
            });

            that.el.addEventListener('click', function (e:any) {

                if (!e.target.closest('.popup__container')) {
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                }
            });

            let popupClose = that.el.querySelector('.popup__close-btn');

            if (popupClose) {
                popupClose.addEventListener('click', function (e:any) {
                    e.preventDefault();
                    that.el.classList.remove('active');
                    that.onClose.call(that);
                })
            }
        }
    }

    return Popup;
}));