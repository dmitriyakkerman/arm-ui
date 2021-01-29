import {define} from "../globals/globals";
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
        public options: AccordionOptions;

        constructor(options: AccordionOptions = {}) {
            this.options = options as object;
            this.options.el = typeof options.el === 'string' ? document.querySelectorAll(options.el) : options.el || document.querySelectorAll('.accordion');
            this.onInit();
        }

        protected onInit(): void {
            this.addClasses();
            this.toggleState();
        }

        static closeAll(accordions: NodeListOf<HTMLElement>): void {
            accordions.forEach(function (accordion: Element) {
                accordion.classList.remove('active')
            })
        }

        protected addClasses(): void {
            (this.options.el as NodeListOf<HTMLElement>).forEach(function (element: HTMLElement) {
                element.classList.add('accordion')
            })
        }

        protected toggleState(): void {
            let that = this;

            (that.options.el as NodeListOf<HTMLElement>).forEach(function (element: HTMLElement) {
                element.firstElementChild!.addEventListener('click', function () {
                    if(that.options.openOneCloseAll) {
                        Accordion.closeAll(that.options.el as NodeListOf<HTMLElement>);

                        (this as HTMLElement).parentElement!.classList.toggle('active')
                    }
                    else {
                        element.classList.toggle('active')
                    }
                })
            })
        }
    }

    return Accordion;
}));