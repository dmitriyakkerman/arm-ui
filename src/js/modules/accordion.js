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
        root.Accordion = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class Accordion {
        constructor(options = {}) {
            this.options = options;
            this.el = (typeof options.el === 'string' ? document.querySelectorAll(options.el) : options.el || document.querySelectorAll('.accordion'));
            this.onInit();
        }
        onInit() {
            this.addClasses();
            this.toggleState();
        }
        addClasses() {
            let that = this;
            that.el.forEach(function (element) {
                element.classList.add('accordion');
            });
        }
        toggleState() {
            let that = this;
            that.el.forEach(function (element) {
                element.firstElementChild.addEventListener('click', function () {
                    element.classList.toggle('active');
                });
            });
        }
    }
    return Accordion;
}));
