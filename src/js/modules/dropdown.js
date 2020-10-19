"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals/globals");
(function (root, factory) {
    if (typeof globals_1.define === 'function' && globals_1.define.amd) {
        globals_1.define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.Dropdown = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class Dropdown {
        constructor($el, options) {
            if (!$el) {
                return;
            }
            this.$el = (typeof $el === 'string' ? document.querySelector($el) : $el);
            if (options) {
                this.options = options;
                this.options.togglers = options.togglers;
                this.options.bodyClose = typeof options.bodyClose === 'undefined' ? true : options.bodyClose;
                this.options.opened = options.opened || false;
                this.options.content = options.content;
                this.options.onOpen = options.onOpen;
                this.options.onClose = options.onClose;
                this.options.class = options.class || {};
                this.options.class.container = options.class.container || 'dropdown';
                this.options.class.content = options.class.content || 'dropdown__content';
                this.options.class.toggle = options.class.toggle || 'dropdown__toggle';
                this.options.class.open = options.class.open || 'open';
            }
            else {
                this.mergeOptions();
            }
            this.init();
        }
        mergeOptions() {
            let defaults = {
                bodyClose: true,
                opened: false,
                onOpen: function () { },
                onClose: function () { },
                class: {
                    container: 'dropdown',
                    content: 'dropdown__content',
                    toggle: 'dropdown__toggle',
                    open: 'open'
                }
            };
            this.options = Object.assign(this, defaults);
        }
        init() {
            this.initDom();
            this.initEvents();
        }
        initDom() {
            let that = this;
            if (!that.options.togglers) {
                Dropdown.$toggle = [that.$el.querySelector('a.toggler')];
            }
            else {
                Dropdown.$toggle = [];
                for (let i = 0; i < that.options.togglers.length; i++) {
                    Dropdown.$toggle[Dropdown.$toggle.length] = that.options.togglers[i];
                }
            }
            if (that.options.content) {
                Dropdown.$content = that.options.content;
            }
            else {
                Dropdown.$content = that.$el.querySelector('.dropdown__content');
            }
            that.$el.classList.add(that.options.class.container);
            if (that.options.opened) {
                that.open();
            }
            for (let i = 0; i < Dropdown.$toggle.length; i++) {
                Dropdown.$toggle[i].classList.add(that.options.class.toggle);
            }
            Dropdown.$content.classList.add(that.options.class.content);
        }
        initEvents() {
            let that = this;
            for (let i = 0; i < Dropdown.$toggle.length; i++) {
                Dropdown.$toggle[i].addEventListener('click', function (event) {
                    that.eventToggleClick(event);
                });
            }
            if (that.options.bodyClose) {
                document.addEventListener('click', function (event) {
                    that.eventBodyClick(event);
                });
            }
        }
        eventToggleClick(event) {
            event.preventDefault();
            let that = this;
            if (that.$el.classList.contains(that.options.class.open)) {
                that.close();
            }
            else {
                that.open();
            }
        }
        eventBodyClick(event) {
            let that = this;
            if (!that.elementInDropdown(event.target)) {
                that.close();
            }
        }
        elementInDropdown($el) {
            let that = this, parent = $el;
            while (parent) {
                if (parent === that.$el) {
                    return true;
                }
                parent = parent.parentNode;
            }
            return false;
        }
        open() {
            this.$el.classList.add(this.options.class.open);
            if (this.options.onOpen) {
                this.options.onOpen.call(this);
            }
        }
        close() {
            this.$el.classList.remove(this.options.class.open);
            if (this.options.onClose) {
                this.options.onClose.call(this);
            }
        }
    }
    return Dropdown;
}));
