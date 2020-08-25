class Accordion {
  constructor(options = {}) {

    this.elements = options.elements || document.querySelectorAll('.accordion');
    this.onInit();
  }

  onInit() {
    this.addClasses();
    this.toggleState();
  }

  addClasses() {

    let that = this;

    that.elements.forEach(function (element) {
      element.classList.add('accordion')
    })
  }

  toggleState() {

    let that = this;

    that.elements.forEach(function (element) {
      element.querySelector('div:first-child').addEventListener('click', function () {
        element.classList.toggle('active')
      })
    })
  }
}

module.exports = Accordion;

