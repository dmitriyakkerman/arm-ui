import {define} from "../globals/globals";
import {DropdownInterface} from "../interfaces/DropdownInterface";
import {DropdownOptions} from "../types/DropdownOptions";

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
        public $el: HTMLElement;
        public options: DropdownOptions;
        static $toggle: Array<HTMLElement>;
        static $content: HTMLElement;

        constructor($el: string | HTMLElement, options:DropdownOptions) {
            if (!$el) {
                return;
            }

            this.$el = (typeof $el === 'string' ? document.querySelector($el) : $el) as HTMLElement;

            if(options) {
                this.options = options;
                this.options.togglers = options.togglers as NodeListOf<HTMLElement>;
                this.options.bodyClose = options.bodyClose || true as boolean;
                this.options.opened = options.opened || false as boolean;
                this.options.content = options.content as any;
                this.options.onOpen = options.onOpen as Function;
                this.options.onClose = options.onClose as Function;
                this.options.class = options.class || {} as object;
                this.options.class.container = options.class.container || 'dropdown' as string;
                this.options.class.content = options.class.content || 'dropdown__content' as string;
                this.options.class.toggle = options.class.toggle || 'dropdown__toggle' as string;
                this.options.class.open = options.class.open || 'open' as string;
            }
            else {
                this.mergeOptions();
            }

            this.init();
        }

        private mergeOptions(): void {
            let defaults = {
                bodyClose: true,
                opened: false,
                onOpen: function () {},
                onClose: function () {},
                class: {
                    container: 'dropdown',
                    content: 'dropdown__content',
                    toggle: 'dropdown__toggle',
                    open: 'open'
                }
            };

            this.options = Object.assign(this, defaults)
        }

        protected init(): void {
            this.initDom();
            this.initEvents();
        }

        private initDom(): void {
            let that = this;

            if (!that.options.togglers) {
                Dropdown.$toggle = [that.$el.querySelector('a.toggler')] as Array<HTMLElement>;
            }
            else {
                Dropdown.$toggle = [];

                for (let i = 0; i < (that.options.togglers as NodeListOf<HTMLElement>).length; i++) {
                    Dropdown.$toggle[Dropdown.$toggle.length] = (that.options.togglers as NodeListOf<HTMLElement>)[i];
                }
            }

            if (that.options.content as string) {
                Dropdown.$content = that.options.content;
            }
            else {
                Dropdown.$content = that.$el.querySelector('.dropdown__content') as HTMLElement;
            }

            that.$el.classList.add(that.options.class.container as string);

            if (that.options.opened) {
                that.open();
            }

            for (let i = 0; i < Dropdown.$toggle.length; i++) {
                Dropdown.$toggle[i].classList.add(that.options.class.toggle as string);
            }

            Dropdown.$content.classList.add(that.options.class.content as string);
        }

        protected initEvents(): void {
            let that = this;

            for (let i = 0; i < Dropdown.$toggle.length; i++) {
                Dropdown.$toggle[i].addEventListener('click', function (event:Event) {
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
            this.options.onOpen!.call(this);
        }

        public close(): void {
            this.$el.classList.remove(this.options.class.open);
            this.options.onClose!.call(this);
        }
    }

    return Dropdown;
}));