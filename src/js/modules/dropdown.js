"use strict";
exports.__esModule = true;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.Dropdown = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var Dropdown = /** @class */ (function () {
        function Dropdown($el, options) {
            if (options === void 0) { options = {}; }
            this.onOpen = function () { };
            this.onClose = function () { };
            this.opened = false;
            this.bodyClose = true;
            this.togglers = [];
            this.content = null;
            this["class"] = {
                container: 'dropdown',
                content: 'dropdown__content',
                toggle: 'dropdown__toggle',
                open: 'open'
            };
            if (!$el) {
                return;
            }
            this.options = Object.assign(this, options);
            this.$el = typeof $el === 'string' ? document.querySelector($el) : $el;
            this.init();
        }
        Dropdown.prototype.init = function () {
            this.initDom();
            this.initEvents();
        };
        Dropdown.prototype.initDom = function () {
            var that = this;
            if (!that.options.togglers.length) {
                that.$toggle = [that.$el.querySelector('a.toggler')];
            }
            else {
                that.$toggle = [];
                for (var i = 0; i < that.options.togglers.length; i++) {
                    that.$toggle[that.$toggle.length] = that.options.togglers[i];
                }
            }
            if (that.options.content) {
                that.$content = that.options.content;
            }
            else {
                that.$content = that.$el.querySelector('.dropdown__content');
            }
            that.$el.classList.add(that.options["class"].container);
            if (that.options.opened) {
                that.open();
            }
            for (var i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].classList.add(that.options["class"].toggle);
            }
            that.$content.classList.add(that.options["class"].content);
        };
        Dropdown.prototype.initEvents = function () {
            var that = this;
            for (var i = 0; i < that.$toggle.length; i++) {
                that.$toggle[i].addEventListener('click', function (event) {
                    that.eventToggleClick(event);
                });
            }
            if (that.options.bodyClose) {
                document.addEventListener('click', function (event) {
                    that.eventBodyClick(event);
                });
            }
        };
        Dropdown.prototype.eventToggleClick = function (event) {
            event.preventDefault();
            var that = this;
            if (that.$el.classList.contains(that.options["class"].open)) {
                that.close();
            }
            else {
                that.open();
            }
        };
        Dropdown.prototype.eventBodyClick = function (event) {
            var that = this;
            if (!that.elementInDropdown(event.target)) {
                that.close();
            }
        };
        Dropdown.prototype.elementInDropdown = function ($el) {
            var that = this, parent = $el;
            while (parent) {
                if (parent === that.$el) {
                    return true;
                }
                parent = parent.parentNode;
            }
            return false;
        };
        Dropdown.prototype.open = function () {
            this.$el.classList.add(this.options["class"].open);
            this.options.onOpen.call(this);
        };
        Dropdown.prototype.close = function () {
            this.$el.classList.remove(this.options["class"].open);
            this.options.onClose.call(this);
        };
        return Dropdown;
    }());
    return Dropdown;
}));
