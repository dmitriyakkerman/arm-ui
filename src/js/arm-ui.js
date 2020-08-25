import {Accordion} from './modules/accordion'
import {Tabs} from './modules/tabs'
import {Popup} from './modules/popup'
import {SelectExtended} from './modules/select'
import {Dropdown} from './modules/dropdown'

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