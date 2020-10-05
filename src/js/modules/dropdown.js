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
        constructor($el, options = {}) {
            this.onOpen = function () { };
            this.onClose = function () { };
            this.opened = false;
            this.bodyClose = true;
            this.togglers = [];
            this.content = null;
            this.class = {
                container: 'dropdown',
                content: 'dropdown__content',
                toggle: 'dropdown__toggle',
                open: 'open'
            };
            if (!$el) {
                return;
            }
            this.options = Object.assign(this, options);
            this.$el = (typeof $el === 'string' ? document.querySelector($el) : $el);
            this.init();
        }
        init() {
            this.initDom();
            this.initEvents();
        }
        initDom() {
            let that = this;
            if (!that.options.togglers.length) {
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
        initEvents() {
            let that = this;
            for (let i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].addEventListener('click', function (event) {
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
            this.options.onOpen.call(this);
        }
        close() {
            this.$el.classList.remove(this.options.class.open);
            this.options.onClose.call(this);
        }
    }
    return Dropdown;
}));
