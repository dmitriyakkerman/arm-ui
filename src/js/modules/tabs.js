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
        root.Tabs = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class Tabs {
        constructor(options = {}) {
            this.onLoad = function () { };
            this.options = Object.assign(this, options);
            this.tabTogglers = (typeof options.tabTogglers === 'string' ?
                document.querySelectorAll(options.tabTogglers) :
                options.tabTogglers ||
                    document.querySelectorAll('.tabs [data-pane]'));
            this.onInit();
            this.onLoad();
        }
        static clearClasses(arr) {
            arr.forEach(function (el) {
                el.classList.remove('active');
            });
        }
        onInit() {
            this.setCurrentOnInit();
            this.initClasses();
            this.changeCurrent();
        }
        setCurrentOnInit() {
            let currentTabToggler = this.tabTogglers[0];
            let currentPane;
            if (this.tabTogglers[0] instanceof HTMLElement) {
                currentPane = document.getElementById(currentTabToggler.dataset.pane);
            }
            currentTabToggler.classList.add('active');
            currentPane.classList.add('active');
        }
        initClasses() {
            this.tabTogglers.forEach(function (tabToggler) {
                let matchedPane = document.getElementById(tabToggler.dataset.pane);
                matchedPane.classList.add('tab-pane');
            });
        }
        changeCurrent() {
            let that = this;
            that.tabTogglers.forEach(function (tabToggler) {
                tabToggler.addEventListener('click', function (e) {
                    e.preventDefault();
                    Tabs.clearClasses(that.tabTogglers);
                    Tabs.clearClasses(document.querySelectorAll('.tab-pane'));
                    this.classList.add('active');
                    let matchedPane = document.getElementById(this.dataset.pane);
                    matchedPane.classList.add('active');
                });
            });
        }
    }
    return Tabs;
}));
