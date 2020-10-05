import {define} from "../globals/globals";
import {TabsInterface} from "../interfaces/TabsInterface";
import {TabsOptions} from "../types/TabsOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Tabs = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Tabs implements TabsInterface {
        public options: object;
        public tabTogglers: any;
        public onLoad: Function = function () {};

        constructor(options:TabsOptions = {}) {
            this.options = Object.assign(this, options);
            this.tabTogglers = (
                typeof options.tabTogglers === 'string' ?
                document.querySelectorAll(options.tabTogglers) :
                options.tabTogglers ||
                document.querySelectorAll('.tabs [data-pane]')
            ) as NodeListOf<HTMLElement>;
            this.onInit();
            this.onLoad();
        }

        static clearClasses(arr: NodeListOf<HTMLElement>): void {
            arr.forEach(function (el: HTMLElement) {
                el.classList.remove('active');
            })
        }

        protected onInit(): void {
            this.setCurrentOnInit();
            this.initClasses();
            this.changeCurrent();
        }

        private setCurrentOnInit(): void {
            let currentTabToggler = this.tabTogglers[0];
            let currentPane: any;
            if(this.tabTogglers[0] instanceof HTMLElement) {
                currentPane = document.getElementById(currentTabToggler.dataset.pane) as Element;
            }

            currentTabToggler.classList.add('active');
            currentPane!.classList.add('active');
        }

        private initClasses(): void {
            this.tabTogglers.forEach(function(tabToggler: HTMLElement) {
                let matchedPane = document.getElementById(tabToggler.dataset.pane!) as Element;
                matchedPane!.classList.add('tab-pane')
            })
        }

        protected changeCurrent(): void {
            let that = this;

            that.tabTogglers.forEach(function (tabToggler: HTMLElement) {
                tabToggler.addEventListener('click', function (e: Event) {
                    e.preventDefault();

                    Tabs.clearClasses(that.tabTogglers);
                    Tabs.clearClasses(document.querySelectorAll('.tab-pane'));

                    this.classList.add('active');

                    let matchedPane = document.getElementById(this.dataset.pane!);
                    matchedPane!.classList.add('active');
                })
            })
        }
    }

    return Tabs;
}));