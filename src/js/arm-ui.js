const Accordion = require('../js/modules/accordion');
const Tabs = require('../js/modules/tabs');
const Popup = require('../js/modules/popup');
const SelectExtended = require('../js/modules/select');
const Dropdown = require('../js/modules/dropdown');

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