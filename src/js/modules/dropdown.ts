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

        constructor($el: string | object, options = {}) {
            if (!$el) {
                return;
            }

            this.options = Object.assign(this, options);
            this.$el = typeof $el === 'string' ? document.querySelector($el) : $el;
            this.init();
        }

        protected init() :void {
            this.initDom();
            this.initEvents();
        }

        private initDom() :void {
            let that = this;

            if (!that.options.togglers.length ) {
                that.$toggle = [that.$el.querySelector('a.toggler')];
            }
            else {
                that.$toggle = [];

                for (let i = 0; i < that.options.togglers.length; i++) {
                    that.$toggle[that.$toggle.length] = that.options.togglers[i];
                }
            }

            if (that.options.content) {
                that.$content = that.options.content;
            }
            else {
                that.$content = that.$el.querySelector('.dropdown__content');
            }

            that.$el.classList.add(that.options.class.container);

            if (that.options.opened) {
                that.open();
            }

            for (let i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].classList.add(that.options.class.toggle);
            }

            that.$content.classList.add(that.options.class.content);
        }

        protected initEvents() :void {
            let that = this;

            for (let i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].addEventListener('click', function (event:Event) {
                    that.eventToggleClick(event);
                });
            }

            if (that.options.bodyClose) {
                document.addEventListener('click', function (event) {
                    that.eventBodyClick(event);
                });
            }
        }

        protected eventToggleClick(event: Event) :void {
            event.preventDefault();

            let that = this;

            if (that.$el.classList.contains(that.options.class.open)) {
                that.close();
            }
            else {
                that.open();
            }
        }

        protected eventBodyClick(event:Event) :void {
            let that = this;

            if (!that.elementInDropdown(event.target) ) {
                that.close();
            }
        }

         protected elementInDropdown($el:any) :boolean {
            let that = this,
                parent = $el;

            while (parent) {
                if (parent === that.$el) {
                    return true;
                }

                parent = parent.parentNode;
            }

            return false;
        }

        public open() :void {
            this.$el.classList.add(this.options.class.open);
            this.options.onOpen.call(this);
        }

        public close() :void {
            this.$el.classList.remove(this.options.class.open);
            this.options.onClose.call(this);
        }
    }

    return Dropdown;
}));