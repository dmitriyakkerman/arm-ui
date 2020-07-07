const ArmUI = require('../src/js/arm-ui');

describe('ArmUI testing', () => {

  test('Defining ArmUI', () => {
    expect(ArmUI).toBeDefined();
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

  test('Accordion should be initialized', () => {
    expect(accordion).toBeTruthy();
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
    openers:  document.querySelectorAll('.j-popup'),
    closable: true
  });

  test('ArmUI.Popup should contain root selector', () => {
    expect(popup.el).toBeDefined();
  });

  test('Popup should contain openers', () => {
    expect(popup.openers).toBeTruthy();
  });

  test('Popup should be initialized', () => {
    expect(popup).toBeTruthy();
  });

});

describe('Tabs testing', () => {

});

describe('SelectExtended testing', () => {

  test('Defining ArmUI.SelextExtended', () => {
    expect(ArmUI.SelectExtended).toBeDefined();
  });

});