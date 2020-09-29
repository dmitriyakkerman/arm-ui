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
        root.Tabs = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var Tabs = /** @class */ (function () {
        function Tabs(options) {
            if (options === void 0) { options = {}; }
            this.onLoad = function () { };
            this.options = Object.assign(this, options);
            this.tabTogglers = typeof options.tabTogglers === 'string' ? document.querySelectorAll(options.tabTogglers) : options.tabTogglers || document.querySelectorAll('.tabs [data-pane]');
            this.onInit();
            this.onLoad();
        }
        Tabs.clearClasses = function (arr) {
            arr.forEach(function (el) {
                el.classList.remove('active');
            });
        };
        Tabs.prototype.onInit = function () {
            this.setCurrentOnInit();
            this.initClasses();
            this.changeCurrent();
        };
        Tabs.prototype.setCurrentOnInit = function () {
            var currentTabToggler = this.tabTogglers[0];
            var currentPane = document.getElementById(currentTabToggler.dataset.pane);
            currentTabToggler.classList.add('active');
            currentPane.classList.add('active');
        };
        Tabs.prototype.initClasses = function () {
            this.tabTogglers.forEach(function (tabToggler) {
                var matchedPane = document.getElementById(tabToggler.dataset.pane);
                matchedPane.classList.add('tab-pane');
            });
        };
        Tabs.prototype.changeCurrent = function () {
            var that = this;
            that.tabTogglers.forEach(function (tabToggler) {
                tabToggler.addEventListener('click', function (e) {
                    e.preventDefault();
                    Tabs.clearClasses(that.tabTogglers);
                    Tabs.clearClasses(document.querySelectorAll('.tab-pane'));
                    this.classList.add('active');
                    var matchedPane = document.getElementById(this.dataset.pane);
                    matchedPane.classList.add('active');
                });
            });
        };
        return Tabs;
    }());
    return Tabs;
}));
