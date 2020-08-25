class Tabs {
  constructor(options = {}) {

    this.tabTogglers = options.tabTogglers || document.querySelectorAll('.tabs [data-pane]');
    this.mergeOptions(options);
    this.options.onLoad();
    this.onInit();
  }

  mergeOptions(options) {

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

  onInit() {
    this.setCurrentOnInit();
    this.initClasses();
    this.changeCurrent();
  }

  setCurrentOnInit() {

    let currentTabToggler = this.tabTogglers[0];
    let currentPane = document.getElementById(currentTabToggler.dataset.pane);

    currentTabToggler.classList.add('active');
    currentPane.classList.add('active');
  }

  initClasses() {

    this.tabTogglers.forEach(function(tabToggler) {
      let matchedPane = document.getElementById(tabToggler.dataset.pane);
      matchedPane.classList.add('tab-pane')
    })
  }

  changeCurrent() {

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

module.exports = Tabs;