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

  test('Defining ArmUI.Dropdown', () => {
    expect(ArmUI.Dropdown).toBeDefined();
  });

  test('Defining ArmUI.Lightbox', () => {
    expect(ArmUI.Lightbox).toBeDefined();
  });

});

describe('Accordion testing', () => {

  //Default accordion markup

  document.body.innerHTML = `
    <div class="accordion">
      <div>Question1</div>
      <div>Answer1</div>
    </div>
  `;

  //Accordion initialization

  let accordion = new ArmUI.Accordion({
    el: document.querySelectorAll('.accordion'),
    openOneCloseAll: true
  });

  test('Accordion module should be defined', () => {
    expect(accordion).toBeDefined();
  });

  test('Accordion should contain root selector', () => {
    expect(accordion.options.el).toBeDefined();
  });

  test('Accordion should contain openOneCloseAll function with "truthy" value', () => {
    expect(accordion.options.openOneCloseAll).toBe(true);
  });

});

describe('Tabs testing', () => {

  //Default tabs markup

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

  //Tabs initialization

  let tabs = new ArmUI.Tabs({
    tabTogglers: document.querySelectorAll('.tabs a'),
    onLoad: function() {}
  });

  test('Tabs module should be defined', () => {
    expect(tabs).toBeDefined();
  });

  test('Tabs should contain togglers option', () => {
    expect(tabs.options.tabTogglers).toBeDefined();
  });

  test('Tabs should contain onLoad function', () => {
    expect(tabs.options.onLoad).toBeDefined();
    expect(tabs.options.onLoad).toBeInstanceOf(Function);
  });

});

describe('Popup testing', () => {

  //Default popup markup

  document.body.innerHTML = `
    <div class="popup">
      <div>Popup text</div>
    </div>
    <a href="#" class="j-popup">Show popup</a>
  `;

  //Popup initialization

  let popup = new ArmUI.Popup({
    el: '.popup',
    openers: '.j-popup',
    closable: true,
    onLoad: function() {},
    onOpen: function() {},
    onClose: function() {}
  });

  test('Popup module should be defined', () => {
    expect(popup).toBeDefined();
  });

  test('ArmUI.Popup should contain root selector', () => {
    expect(popup.options.el).toBeDefined();
  });

  test('Popup should contain "openers" option', () => {
    expect(popup.options.openers).toBeTruthy();
  });

  test('Popup should contain "closable" option', () => {
    expect(popup.options.closable).toBeTruthy();
  });

  test('Popup should contain "onLoad" function', () => {
    expect(popup.options.onLoad).toBeDefined();
    expect(popup.options.onLoad).toBeInstanceOf(Function);
  });

  test('Popup should contain "onOpen" function', () => {
    expect(popup.options.onOpen).toBeDefined();
    expect(popup.options.onOpen).toBeInstanceOf(Function);
  });

  test('Popup should contain "onClose" function', () => {
    expect(popup.options.onClose).toBeDefined();
    expect(popup.options.onClose).toBeInstanceOf(Function);
  });

});

describe('SelectExtended testing', () => {

  //Default select markup

  document.body.innerHTML = `
    <select class="select-default" data-placeholder="Выберите опцию">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  `;

  //Select initialization

  let select = new ArmUI.SelectExtended('.select-default', {
    containerClass: 'additional-class',
    multiSelect: false,
    multiSelectedText: 'Выбрано',
    onChange: function() {}
  });

  test('SelectExtended module should be defined', () => {
    expect(select).toBeDefined();
  });

  test('SelectExtended should contain root selector', () => {
    expect(select.$el).toBeDefined();
  });

  test('SelectExtended toBe multiselected', () => {
    expect(select.options.multiSelect).toBeFalsy();
  });

  test('SelectExtended should have class wrapper', () => {
    expect(select.options.containerClass).toBeDefined();
  });

  test('SelectExtended should have "onChange" function', () => {
    expect(select.options.onChange).toBeDefined();
    expect(select.options.onChange).toBeInstanceOf(Function);
  });

});

describe('Dropdown testing', () => {

  //Default dropdown markup

  document.body.innerHTML = `
    <div id="dropdown-lang" class="dropdown">
      <a href="#" class="toggler">Some text</a>
      <ul class="dropdown__content">
        <li>
          <a href="">111</a>
        </li>
      </ul>
    </div>
  `;

  //Dropdown initialization

  let dropdown = new ArmUI.Dropdown('#dropdown-lang', {
    togglers: document.querySelectorAll('.toggler'),
    bodyClose: true,
    opened: false,
    onOpen: function() {},
    onClose: function() {}
  });

  test('Dropdown module should be defined', () => {
    expect(dropdown).toBeDefined();
  });

  test('Dropdown should contain root selector', () => {
    expect(dropdown.$el).toBeDefined();
  });

  test('Dropdown should have "togglers" options', () => {
    expect(dropdown.options.togglers).toBeTruthy();
  });

  test('Dropdown should have "bodyClose" options', () => {
    expect(dropdown.options.bodyClose).toBeTruthy();
  });

  test('Dropdown should have "opened" options', () => {
    expect(dropdown.options.opened).toBeFalsy();
  });

  test('Dropdown should have "onOpen" function', () => {
    expect(dropdown.options.onOpen).toBeDefined();
    expect(dropdown.options.onOpen).toBeInstanceOf(Function);
  });

  test('Dropdown should have "onClose" function', () => {
    expect(dropdown.options.onClose).toBeDefined();
    expect(dropdown.options.onClose).toBeInstanceOf(Function);
  });

  describe("Lightbox testing", () => {

    //Default lightbox markup

    document.body.innerHTML = `
        <img src=""> 
    `;

    //Lightbox initialization

    let lightbox = new ArmUI.Lightbox({
      targets: 'img'
    })

    test('Lightbox module should be defined', () => {
      expect(lightbox).toBeDefined();
    });

    test('Lightbox should have "targets" options', () => {
      expect(lightbox.options.targets).toBeTruthy();
    });
  })
});