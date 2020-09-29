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
        root.Accordion = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var Accordion = /** @class */ (function () {
        function Accordion(options) {
            if (options === void 0) { options = {}; }
            this.options = options;
            this.el = typeof options.el === 'string' ? document.querySelectorAll(options.el) : options.el || document.querySelectorAll('.accordion');
            this.onInit();
        }
        Accordion.prototype.onInit = function () {
            this.addClasses();
            this.toggleState();
        };
        Accordion.prototype.addClasses = function () {
            var that = this;
            that.el.forEach(function (element) {
                element.classList.add('accordion');
            });
        };
        Accordion.prototype.toggleState = function () {
            var that = this;
            that.el.forEach(function (element) {
                element.firstElementChild.addEventListener('click', function () {
                    element.classList.toggle('active');
                });
            });
        };
        return Accordion;
    }());
    return Accordion;
}));
