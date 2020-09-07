(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Dropdown = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class Popup {
    constructor(options = {}) {

      if (!options.el) {
        throw new Error('No popup root selector')
      }

      if (!options.openers) {
        throw new Error('No popup opener selector/selectors')
      }

      this.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
      this.openers = options.openers;
      this.closable = options.closable || false;
      this.mergeOptions(options);
      this.onInit();
      this.options.onLoad();
    }

    mergeOptions(options) {
      let that = this;

      let defaults = {
        onLoad: function() {},
        onOpen: function () {},
        onClose: function () {}
      };

      that.options = Object.assign(defaults, options);
    }

    onInit() {
      this.initHTML();
      this.initEvents();
    }

    initHTML() {
      this.el.classList.add('popup');
      this.el.firstElementChild.classList.add('popup__container');

      if (this.closable) {
        let popupClose = document.createElement('a');
        popupClose.href = '#';
        popupClose.classList.add('popup__close-btn');
        this.el.firstElementChild.appendChild(popupClose);
      }

      document.body.appendChild(this.el);

      return this.el;
    }

    initEvents() {
      this.open();
      this.close();
    }

    open() {

      let that = this;

      that.openers.forEach(function (popupOpen) {
        popupOpen.addEventListener('click', function (e) {
          e.preventDefault();
          that.el.classList.add('active');

          that.options.onOpen.call(that, e);
        })
      })
    }

    close() {

      let that = this;

      document.addEventListener('keydown', function(e) {
        if(e.key === "Escape") {
          that.el.classList.remove('active');
          that.options.onClose.call(that);
        }
      });

      that.el.addEventListener('click', function (e) {

        if (!e.target.closest('.popup__container')) {
          that.el.classList.remove('active');
          that.options.onClose.call(that);
        }
      });

      let popupClose = that.el.querySelector('.popup__close-btn');

      if (popupClose) {
        popupClose.addEventListener('click', function (e) {
          e.preventDefault();
          that.el.classList.remove('active');
          that.options.onClose.call(that);
        })
      }
    }
  }

  return Popup;

}));