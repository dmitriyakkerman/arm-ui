export class Dropdown {

  constructor($el, options) {
    if (!$el) {
      return;
    }

    let that = this;

    options = typeof options === 'undefined' ? {} : options;

    that.$el = $el;
    that.mergeOptions(options);
    that.init();
  }

  mergeOptions(options) {
    let that = this;

    let defaults = {
      opened: false,
      bodyClose: true,
      togglers: [],
      content: null,
      class: {
        container: 'dropdown',
        content: 'dropdown__content',
        toggle: 'dropdown__toggle',
        open: 'open'
      },
      onOpen: function () {

      },
      onClose: function () {

      }
    };

    that.options = Object.assign(defaults, options);
  }

  init() {
    let that = this;

    that.initDom();
    that.initEvents();
  }

  initDom() {
    let that = this;

    that.$container = that.$el;

    if ( ! that.options.togglers.length ) {
      that.$toggle =  [ that.$container.querySelector('a.toggler') ];
    }
    else {
      that.$toggle = [];

      for (let i = 0; i < that.options.togglers.length; i++) {
        that.$toggle[that.$toggle.length] = that.options.togglers[i];
      }
    }

    if (that.options.content) {
      that.$content = that.options.content;
    }
    else {

      that.$content = that.$container.querySelector('.dropdown__content');

    }

    that.$container.classList.add(that.options.class.container);

    if (that.options.opened) {
      that.open();
    }

    for (let i = 0; i < that.$toggle.length; i++) {
      that.$toggle[i].classList.add(that.options.class.toggle);
    }

    that.$content.classList.add(that.options.class.content);
  }

  initEvents() {
    let that = this;

    for (let i = 0; i < that.$toggle.length; i++) {
      that.$toggle[i].addEventListener('click', function (event) {

        that.eventToggleClick(event);

      });
    }

    if (that.options.bodyClose) {
      document.addEventListener('click', function (event) {

        that.eventBodyClick(event);

      });
    }
  }

  eventToggleClick(event) {
    event.preventDefault();

    let that = this;

    if (that.$container.classList.contains(that.options.class.open)) {
      that.close();
    }
    else {
      that.open();
    }
  }

  eventBodyClick(event) {
    let that = this;

    if (!that.elementInDropdown(event.target) ) {
      that.close();
    }
  }

  elementInDropdown($el) {
    let that = this,
      parent = $el;

    while (parent) {
      if (parent === that.$container) {
        return true;
      }

      parent = parent.parentNode;
    }

    return false;
  }

  open() {
    let that = this;

    that.$container.classList.add(that.options.class.open);
    that.options.onOpen.call(that);
  }

  close() {
    let that = this;

    that.$container.classList.remove(that.options.class.open);
    that.options.onClose.call(that);
  }
}