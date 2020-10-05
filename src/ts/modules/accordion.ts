import {AccordionInterface} from "../interfaces/AccordionInterface";
import {AccordionOptions} from '../types/AccordionOptions'

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Accordion = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Accordion implements AccordionInterface {
        public options: object;
        public el: any;

        constructor(options: AccordionOptions = {}) {
            this.options = options;
            this.el = typeof options.el === 'string' ? document.querySelectorAll(options.el) : options.el || document.querySelectorAll('.accordion');
            this.onInit();
        }

        protected onInit(): void {
            this.addClasses();
            this.toggleState();
        }

        protected addClasses(): void {
            let that = this;

            that.el.forEach(function (element:HTMLElement) {
                element.classList.add('accordion')
            })
        }

        protected toggleState(): void {
            let that = this;

            that.el.forEach(function (element:HTMLElement) {
                element.firstElementChild!.addEventListener('click', function () {
                    element.classList.toggle('active')
                })
            })
        }
    }

    return Accordion;
}));