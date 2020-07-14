const ArmUI = require('../src/js/arm-ui');

describe('ArmUI testing', () => {

  test('Defining ArmUI', () => {
    expect(ArmUI).toBeDefined();
  });

  test('Defining ArmUI globally', () => {
    expect(window.ArmUI).toBeDefined();
  });

  test('Defining ArmUI.Accordion', () => {
    expect(ArmUI.Accordion).toBeDefined();
  });

  test('Defining ArmUI.Tabs', () => {
    expect(ArmUI.Tabs).toBeDefined();
  });

  test('Defining ArmUI.Popup', () => {
    expect(ArmUI.Popup).toBeDefined();
  });

  test('Defining ArmUI.SelectExtended', () => {
    expect(ArmUI.SelectExtended).toBeDefined();
  });

});

describe('Accordion testing', () => {

  //Adding default accordion markup

  document.body.innerHTML = `
    <div class="accordion">
      <div>Question1</div>
      <div>Answer1</div>
    </div>
  `;

  //Initializing accordion

  let accordion = new ArmUI.Accordion({
    elements: document.querySelectorAll('.accordion')
  });

  test('Accordion should contain root selector', () => {
    expect(accordion.elements).toBeDefined();
  });

  test('Accordion module should be initialized', () => {
    expect(accordion).toBeTruthy();
  });

});

describe('Tabs testing', () => {

  //Adding default tabs markup

  document.body.innerHTML = `
    <ul class="tabs">
      <li>
          <a href="" data-pane="pane-1">Link 1</a>
      </li>
      <li>
          <a href="" data-pane="pane-2">Link 2</a>
      </li>
    </ul>
    <div class="tab-pane" id="pane-1">Content 1</div>
    <div class="tab-pane" id="pane-2">Content 2</div>   
  `;

  //Initializing tabs

  let tabs = new ArmUI.Tabs({
    tabTogglers: document.querySelectorAll('.tabs a')
  });

  test('Tabs should contain togglers', () => {
    expect(tabs.tabTogglers).toBeDefined();
  });

  test('Tabs module should be initialized', () => {
    expect(tabs).toBeTruthy();
  });

});

describe('Popup testing', () => {

  //Adding default popup markup

  document.body.innerHTML = `
    <div class="popup">
      <div>Popup text</div>
    </div>
    <a href="#" class="j-popup">Show popup</a>
  `;

  //Initializing popup

  let popup = new ArmUI.Popup({
    el: document.querySelector('.popup'),
    openers: document.querySelectorAll('.j-popup'),
    closable: true
  });

  test('ArmUI.Popup should contain root selector', () => {
    expect(popup.el).toBeDefined();
  });

  test('Popup should contain openers', () => {
    expect(popup.openers).toBeTruthy();
  });

  test('Popup module should be initialized', () => {
    expect(popup).toBeDefined();
  });

});

describe('SelectExtended testing', () => {

  document.body.innerHTML = `
    <select class="select-default" data-placeholder="Выберите опцию">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  `;

  let select = new ArmUI.SelectExtended(document.querySelector('.select-default'), {
    multiSelect: true,
    containerClass: 'additional-class'
  });

  test('SelectExtended should contain root selector', () => {
    expect(select.$select).toBeDefined();
  });

  test('SelectExtended toBe multiselected', () => {
    expect(select.options.multiSelect).toBeTruthy();
  });

  test('SelectExtended should have class wrapper', () => {
    expect(select.options.containerClass).toBeDefined();
  });

  test('SelectExtended module should be initialized', () => {
    expect(select).toBeDefined();
  });

});