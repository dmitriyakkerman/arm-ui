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
            this.options.el = typeof options.el === 'string' ? document.querySelectorAll(options.el) : options.el || document.querySelectorAll('.accordion');
            this.onInit();
        }
        onInit() {
            this.addClasses();
            this.toggleState();
        }
        static closeAll(accordions) {
            accordions.forEach(function (accordion) {
                accordion.classList.remove('active');
            });
        }
        addClasses() {
            this.options.el.forEach(function (element) {
                element.classList.add('accordion');
            });
        }
        toggleState() {
            let that = this;
            that.options.el.forEach(function (element) {
                element.firstElementChild.addEventListener('click', function () {
                    if (that.options.openOneCloseAll) {
                        Accordion.closeAll(that.options.el);
                        this.parentElement.classList.toggle('active');
                    }
                    else {
                        element.classList.toggle('active');
                    }
                });
            });
        }
    }
    return Accordion;
}));
