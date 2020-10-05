import {define} from "../globals/globals";
import {DropdownInterface} from "../interfaces/DropdownInterface";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Dropdown = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Dropdown implements DropdownInterface {
        public $el: any;
        public options: any;
        public $toggle: any;
        public $content: any;
        public onOpen: Function = function () {};
        public onClose: Function = function() {};
        public opened: boolean = false;
        public bodyClose: boolean = true;
        public togglers: Array<any> = [];
        public content: null = null;
        public class: object = {
            container: 'dropdown',
            content: 'dropdown__content',
            toggle: 'dropdown__toggle',
            open: 'open'
        };

        constructor($el: string | HTMLElement, options = {}) {
            if (!$el) {
                return;
            }

            this.options = Object.assign(this, options);
            this.$el = (typeof $el === 'string' ? document.querySelector($el) : $el) as HTMLElement;
            this.init();
        }

        protected init(): void {
            this.initDom();
            this.initEvents();
        }

        private initDom(): void {
            let that = this;

            if (!(that.options.togglers as NodeListOf<HTMLElement>).length) {
                that.$toggle = [that.$el.querySelector('a.toggler')] as Array<Element>;
            }
            else {
                that.$toggle = [];

                for (let i = 0; i < (that.options.togglers as NodeListOf<HTMLElement>).length; i++) {
                    that.$toggle[that.$toggle.length] = that.options.togglers[i] as Element;
                }
            }

            if (that.options.content as string) {
                that.$content = that.options.content;
            }
            else {
                that.$content = that.$el.querySelector('.dropdown__content') as Element;
            }

            that.$el.classList.add(that.options.class.container as string);

            if (that.options.opened as boolean) {
                that.open();
            }

            for (let i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].classList.add(that.options.class.toggle as string);
            }

            that.$content.classList.add(that.options.class.content as string);
        }

        protected initEvents(): void {
            let that = this;

            for (let i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].addEventListener('click', function (event:Event) {
                    that.eventToggleClick(event);
                });
            }

            if (that.options.bodyClose as boolean) {
                document.addEventListener('click', function (event:Event) {
                    that.eventBodyClick(event);
                });
            }
        }

        protected eventToggleClick(event: Event): void {
            event.preventDefault();

            let that = this;

            if (that.$el.classList.contains(that.options.class.open as string)) {
                that.close();
            }
            else {
                that.open();
            }
        }

        protected eventBodyClick(event: Event): void {
            let that = this;

            if (!that.elementInDropdown(event.target) ) {
                that.close();
            }
        }

         protected elementInDropdown($el: any): boolean {
            let that = this,
                parent = $el;

            while (parent) {
                if (parent === that.$el) {
                    return true;
                }

                parent = parent.parentNode as Element;
            }

            return false;
        }

        public open(): void {
            this.$el.classList.add(this.options.class.open);
            this.options.onOpen.call(this);
        }

        public close(): void {
            this.$el.classList.remove(this.options.class.open);
            this.options.onClose.call(this);
        }
    }

    return Dropdown;
}));