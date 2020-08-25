export class SelectExtended {

  constructor($el, options) {
    let that = this;

    this.id = SelectExtended.generateId();
    this.$select = $el;
    this.placeholder = this.$select.dataset['placeholder'] || '';

    this.options = options || {};

    if (typeof this.options.multiSelect === 'undefined') {
      this.options.multiSelect = false;
    }

    this.blocked = false;

    this.initHtml();
    this.initEvents();

    let value = '';

    Object.defineProperty(this, 'value', {
      get: function () {
        if (that.options.multiSelect) {
          let result = [];

          that.$el.querySelectorAll('.select-ext-multi-option').forEach(($opt) => {
            if ($opt.querySelector('input').checked) {
              result.push($opt.querySelector('input').value);
            }
          });

          return result;
        }

        return value;
      },
      set: function (newValue) {
        value = newValue;
        that._updateValue(value);

        if (typeof this.options.onChange === 'function') {
          that.options.onChange();
        }
      }
    });

    if (!this.options.multiSelect) {
      this.value = null;
    }
  }

  static generateId() {
    if (!SelectExtended.id) {
      SelectExtended.id = 0;
    }

    return SelectExtended.id++;
  }

  initHtml() {
    this.$select.style.display = 'none';
    this.$el = document.createElement('div');
    this.$el.classList.add('select-ext');
    this.$el.classList.add('select-ext-' + this.id);

    if (this.options.containerClass) {
      this.$el.classList.add(this.options.containerClass);
    }

    if (this.options.multiSelect) {
      this._initMultiSelectHtml();
    }
    else {
      this.$el.appendChild(this._makeCurrentValue());
      this.$el.appendChild(this._makeOptionGroup());
      this.$select.parentElement.insertBefore(this.$el, this.$select);
      this.$el.appendChild(this.$select);
    }
  }

  initEvents() {
    let that = this;

    that.$value.onclick = function (event) {
      that.blocked = true;
      that.$el.classList.toggle('active');

      setTimeout(() => {
        that.blocked = false;
      }, 50);
    };

    document.body.addEventListener('click', function (event) {
      if (!that.blocked && !event.target.closest('.select-ext-' + that.id)) {
        that.$el.classList.remove('active');
      }
    });

    that.$el.querySelectorAll('.select-ext-option').forEach((option) => {
      option.onclick = function () {
        that.value = option.dataset['value'];
        that.valueName = option.innerHTML;
        that.$el.classList.remove('active');
      }
    });

    if (that.options.multiSelect) {
      that.selectedCount = 0;

      that.$el.querySelectorAll('.select-ext-multi-option').forEach((option) => {
        option.querySelector('input').onclick = function (event) {

          if (this.checked) {
            that.selectedCount++;
          }
          else {
            that.selectedCount--;
          }

          that.$value.innerHTML = that.options.multiSelectedText + ' ' + that.selectedCount;

          if (that.selectedCount > 0) {
            that.$value.classList.add('active');
          }
          else {
            that.$value.classList.remove('active');
          }
        }
      });
    }
  }

  getName() {
    return this.$select.name;
  }

  _initMultiSelectHtml() {
    // Value
    this.$value = document.createElement('div');
    this.$value.classList.add('select-ext__value');
    this.$el.appendChild(this.$value);

    // Make custom group
    let $group = document.createElement('div');
    $group.classList.add('select-ext__options');
    this.$el.appendChild($group);

    // Make checkbox options
    for (let i = 0; i < this.$select.options.length; i++) {
      let $option = this._makeMultiOption(this.$select.options[i].innerHTML, this.$select.options[i].value, this.$select.options[i].dataset['selected']);
      $group.appendChild($option);
    }

    this.$select.parentElement.insertBefore(this.$el, this.$select);

    // Remove origin select
    this.$select.remove();

    setTimeout(() => {
      let that = this;

      if (that.options.multiSelect) {
        that.selectedCount = 0;

        that.$el.querySelectorAll('.select-ext-multi-option').forEach((option) => {
          if (option.querySelector('input').checked) {
            that.selectedCount++;
          }
        });

        that.$value.innerHTML = that.options.multiSelectedText + ' ' + that.selectedCount;

        if (that.selectedCount > 0) {
          that.$value.classList.add('active');
        }
        else {
          that.$value.classList.remove('active');
        }
      }
    }, 100);

  }

  _makeMultiOption(name, value, selected) {
    let $option = document.createElement('label');
    $option.classList.add('select-ext-multi-option');

    let $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.name = this.$select.name + '[]';
    $checkbox.value = value;
    $checkbox.checked = selected;

    let $fishSpan = document.createElement('span');

    let $name = document.createElement('span');
    $name.innerHTML = name;

    $option.appendChild($checkbox);
    $option.appendChild($fishSpan);
    $option.appendChild($name);

    return $option;
  }

  _makeCurrentValue() {
    this.$value = document.createElement('div');
    this.$value.classList.add('select-ext__value');

    return this.$value;
  }

  _makeOptionGroup() {
    let $group = document.createElement('div');

    $group.classList.add('select-ext__options');

    for (let i = 0; i < this.$select.options.length; i++) {
      $group.appendChild(SelectExtended.makeOption(this.$select.options[i].value, this.$select.options[i].innerHTML));
    }

    return $group;
  }

  _updateValue(value) {
    if (value === null) {
      this._setInactive();

      return;
    }

    let $options = this.$el.querySelectorAll('.select-ext-option');

    for (let i = 0; i < $options.length; i++) {
      if ($options[i].dataset['value'] === value) {
        this.$select.value = value;
        this.$value.innerHTML = $options[i].innerHTML;

        if (this.$value.innerHTML) {
          this.$value.classList.add('active');
        }

        return;
      }
    }

    this.value = null;
  }

  _setInactive() {
    this.$select.selectIndex = -1;
    this.$value.innerHTML = this.placeholder;
    this.$value.classList.remove('active');
  }

  static makeOption(value, text) {
    let $option = document.createElement('div');
    $option.classList.add('select-ext-option');
    $option.dataset['value'] = value;
    $option.innerHTML = text;

    return $option;
  }

}