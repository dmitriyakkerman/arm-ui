import {define} from "../globals/globals";
import {TabsInterface} from "../interfaces/TabsInterface";
import {TabsOptions} from "../types/TabsOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root!.Tabs = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Tabs implements TabsInterface {
        public options: TabsOptions;

        constructor(options:TabsOptions) {
            this.options = options || {};
            this.options.tabTogglers = (Object.keys(this.options).length && options.tabTogglers) ? (typeof options.tabTogglers === 'string' ? document.querySelectorAll(options.tabTogglers) : options.tabTogglers) : document.querySelectorAll('.tabs [data-pane]');
            this.onInit();
            this.onLoad();
        }

        static clearClasses(arr: NodeListOf<HTMLElement>): void {
            arr.forEach(function (el: HTMLElement) {
                el.classList.remove('active');
            })
        }

        protected onLoad(): void {
            if(this.options && (this.options.onLoad as Function)) {
                this.options.onLoad!();
            }
        }

        protected onInit(): void {
            this.setCurrentOnInit();
            this.initClasses();
            this.changeCurrent();
        }

        private setCurrentOnInit(): void {
            let currentTabToggler = (this.options.tabTogglers)[0];
            let currentPane: HTMLElement;
            if(this.options.tabTogglers[0] instanceof HTMLElement) {
                currentPane = document.getElementById(currentTabToggler.dataset.pane)!;
            }

            currentTabToggler.classList.add('active');
            currentPane!.classList.add('active');
        }

        private initClasses(): void {
            this.options.tabTogglers.forEach(function(tabToggler: HTMLElement) {
                let matchedPane = document.getElementById(tabToggler.dataset.pane!) as HTMLElement;
                matchedPane!.classList.add('tab-pane')
            })
        }

        protected changeCurrent(): void {
            let that = this;

            that.options.tabTogglers.forEach(function (tabToggler: HTMLElement) {
                tabToggler.addEventListener('click', function (e: Event) {
                    e.preventDefault();

                    let parentEl = this.closest('.tabs')!.parentElement;

                    Tabs.clearClasses(that.options.tabTogglers);
                    Tabs.clearClasses(parentEl!.querySelectorAll('.tab-pane'));

                    this.classList.add('active');

                    let matchedPane = parentEl!.querySelector('#' + this.dataset.pane!);
                    matchedPane!.classList.add('active');
                })
            })
        }
    }

    return Tabs;
}));