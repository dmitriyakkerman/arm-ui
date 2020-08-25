const Accordion = require('./modules/accordion');
const Tabs = require('./modules/tabs');
const Popup = require('./modules/popup');
const SelectExtended = require('./modules/select');
const Dropdown = require('./modules/dropdown');

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ArmUI = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const ArmUI = {};
  window.ArmUI = ArmUI;

  ArmUI.Accordion = Accordion;
  ArmUI.Tabs = Tabs;
  ArmUI.Popup = Popup;
  ArmUI.SelectExtended = SelectExtended;
  ArmUI.Dropdown = Dropdown;

  return ArmUI;

}));