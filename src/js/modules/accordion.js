(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Accordion = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class Accordion {
    constructor(options = {}) {

      this.el = typeof options.el === 'string' ?
          document.querySelectorAll(options.el) :
          options.el ||
          document.querySelectorAll('.accordion');
      this._onInit();
    }

    _onInit() {
      this._addClasses();
      this._toggleState();
    }

    _addClasses() {

      let that = this;

      that.el.forEach(function (element) {
        element.classList.add('accordion')
      })
    }

    _toggleState() {

      let that = this;

      that.el.forEach(function (element) {
        element.firstElementChild.addEventListener('click', function () {
          element.classList.toggle('active')
        })
      })
    }
  }

  return Accordion;

}));

