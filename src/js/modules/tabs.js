(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Tabs = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class Tabs {
    constructor(options = {}) {

      this.tabTogglers = typeof options.tabTogglers === 'string' ?
          document.querySelectorAll(options.tabTogglers) :
          options.tabTogglers ||
          document.querySelectorAll('.tabs [data-pane]');
      this.#mergeOptions(options);
      this._onInit();
      this.options.onLoad();
    }

    #mergeOptions(options) {

      let defaults = {
        onLoad() {}
      }

      this.options = Object.assign(defaults, options)
    }

    static clearClasses(arr) {
      arr.forEach(function (el) {
        el.classList.remove('active');
      })
    }

    _onInit() {
      this._setCurrentOnInit();
      this._initClasses();
      this._changeCurrent();
    }

    _setCurrentOnInit() {

      let currentTabToggler = this.tabTogglers[0];
      let currentPane = document.getElementById(currentTabToggler.dataset.pane);

      currentTabToggler.classList.add('active');
      currentPane.classList.add('active');
    }

    _initClasses() {

      this.tabTogglers.forEach(function(tabToggler) {
        let matchedPane = document.getElementById(tabToggler.dataset.pane);
        matchedPane.classList.add('tab-pane')
      })
    }

    _changeCurrent() {

      let that = this;

      that.tabTogglers.forEach(function (tabToggler) {
        tabToggler.addEventListener('click', function (e) {
          e.preventDefault();

          that.constructor.clearClasses(that.tabTogglers);
          that.constructor.clearClasses(document.querySelectorAll('.tab-pane'));

          this.classList.add('active');

          let matchedPane = document.getElementById(this.dataset.pane);
          matchedPane.classList.add('active');
        })
      })
    }
  }

  return Tabs;

}));