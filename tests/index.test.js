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

  test('Popup should be initialized', () => {
    expect(popup).toBeTruthy();
  });

  test('Popup should contain openers', () => {
    expect(popup.openers).toBeTruthy();
  });

});

describe('Tabs testing', () => {

});

describe('Accordion testing', () => {

});

describe('SelectExtended testing', () => {

  test('Defining ArmUI.SelextExtended', () => {
    expect(ArmUI.SelectExtended).toBeDefined();
  });

});