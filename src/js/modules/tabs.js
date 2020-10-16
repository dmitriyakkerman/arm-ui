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
            this.options = options;
            this.options.tabTogglers = document.querySelectorAll(options.tabTogglers);
            this.onInit();
            this.options.onLoad();
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
            let currentTabToggler = this.options.tabTogglers[0];
            let currentPane;
            if (this.options.tabTogglers[0] instanceof HTMLElement) {
                currentPane = document.getElementById(currentTabToggler.dataset.pane);
            }
            currentTabToggler.classList.add('active');
            currentPane.classList.add('active');
        }
        initClasses() {
            this.options.tabTogglers.forEach(function (tabToggler) {
                let matchedPane = document.getElementById(tabToggler.dataset.pane);
                matchedPane.classList.add('tab-pane');
            });
        }
        changeCurrent() {
            let that = this;
            that.options.tabTogglers.forEach(function (tabToggler) {
                tabToggler.addEventListener('click', function (e) {
                    e.preventDefault();
                    Tabs.clearClasses(that.options.tabTogglers);
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
