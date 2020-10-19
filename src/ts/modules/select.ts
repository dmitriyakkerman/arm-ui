import {define} from "../globals/globals";
import {SelectExtendedInterface} from "../interfaces/SelectExtendedInterface";
import {SelectExtendedOptions} from "../types/SelectExtendedOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.SelectExtended = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class SelectExtended implements SelectExtendedInterface {

        public $select: any;
        public $el: HTMLElement;
        public id: number;
        static id: number;
        public placeholder: string;
        public options: any;
        public blocked: boolean;
        public value: any;
        public $value: HTMLElement;
        valueName: string;
        selectedCount: number;
        checked: boolean;

        constructor($el: string | Element, options: SelectExtendedOptions) {
            let that = this;

            this.id = SelectExtended.generateId();
            this.$select = (typeof $el === 'string' ? document.querySelector($el) : $el) as HTMLElement;
            this.placeholder = this.$select.dataset['placeholder'] || '';

            if(options) {
                this.options = options as object;
                this.options.containerClass = options.containerClass as string;
                this.options.multiSelect = options.multiSelect as boolean;
                this.options.multiSelectedText = options.multiSelectedText as string;
                this.options.onChange = options.onChange as Function;
            }
            else {
                this.mergeOptions();
            }

            this.blocked = false;

            this.initHtml();
            this.initEvents();

            let value = '';

            Object.defineProperty(this, 'value', {
                get: function (): string {
                    if (that.options.multiSelect) {
                        let result: any = [];

                        ((that.$el as HTMLElement).querySelectorAll('.select-ext-multi-option') as NodeListOf<HTMLElement>).forEach(($opt: HTMLElement) => {
                            if ($opt.querySelector('input')!.checked) {
                                result.push($opt.querySelector('input')!.value);
                            }
                        });

                        return result;
                    }

                    return value;
                },
                set: function (newValue: string): void {
                    value = newValue;
                    that.updateValue(value);

                    if (typeof that.options.onChange === 'function') {
                        that.options.onChange();
                    }
                }
            });

            if (!this.options.multiSelect) {
                this.value = null;
            }
        }

        private mergeOptions(): void {
            let defaults = {
                onChange: function () {}
            };

            this.options = Object.assign(defaults)
        }

        static generateId(): number {
            if (!SelectExtended.id) {
                SelectExtended.id = 0;
            }

            return SelectExtended.id++;
        }

        private initHtml(): void {
            this.$select.style.display = 'none';
            this.$el = document.createElement('div');
            this.$el.classList.add('select-ext');
            this.$el.classList.add('select-ext-' + this.id);

            if (this.options.containerClass) {
                this.$el.classList.add(this.options.containerClass);
            }

            if (this.options.multiSelect) {
                this.initMultiSelectHtml();
            }
            else {
                this.$el.appendChild(this.makeCurrentValue());
                this.$el.appendChild(this.makeOptionGroup());
                this.$select.parentElement.insertBefore(this.$el, this.$select);
                this.$el.appendChild(this.$select);
            }
        }

        private initEvents(): void {
            let that = this;

            (that.$value as HTMLElement).onclick = function (event: Event) {
                that.blocked = true;
                that.$el.classList.toggle('active');

                setTimeout(() => {
                    that.blocked = false;
                }, 50);
            };

            document.body.addEventListener('click', function (event: Event) {
                if (!that.blocked && (!((event.target! as Element).closest('.select-ext-' + that.id))) as boolean) {
                    that.$el.classList.remove('active');
                }
            });

            ((that.$el as HTMLElement).querySelectorAll('.select-ext-option') as NodeListOf<HTMLElement>).forEach((option: HTMLElement) => {
                option.onclick = function () {
                    that.value = option.dataset['value'];
                    that.valueName = option.innerHTML;
                    that.$el.classList.remove('active');
                }
            });

            if (that.options.multiSelect) {
                that.selectedCount = 0;

                ((that.$el as HTMLElement).querySelectorAll('.select-ext-multi-option') as NodeListOf<HTMLElement>).forEach((option: HTMLElement) => {
                    option.querySelector('input')!.onclick = function (event: Event) {

                        if (that.checked as boolean) {
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

        private getName(): string {
            return this.$select.name;
        }

        protected initMultiSelectHtml(): void {
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
                let $option = this.makeMultiOption(this.$select.options[i].innerHTML, this.$select.options[i].value, this.$select.options[i].dataset['selected']);
                $group.appendChild($option);
            }

            this.$select.parentElement.insertBefore(this.$el, this.$select);

            // Remove origin select
            this.$select.remove();

            setTimeout(() => {
                let that = this;

                if (that.options.multiSelect) {
                    that.selectedCount = 0;

                    ((that.$el as HTMLElement).querySelectorAll('.select-ext-multi-option') as NodeListOf<HTMLElement>).forEach((option: HTMLElement) => {
                        if (option.querySelector('input')!.checked) {
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

        protected makeMultiOption(name: string, value: string, selected: boolean): HTMLElement {
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

        protected makeCurrentValue(): HTMLElement {
            this.$value = document.createElement('div');
            this.$value.classList.add('select-ext__value');

            return this.$value;
        }

        protected makeOptionGroup(): HTMLElement {
            let $group = document.createElement('div');

            $group.classList.add('select-ext__options');

            for (let i = 0; i < this.$select.options.length; i++) {
                $group.appendChild(SelectExtended.makeOption(this.$select.options[i].value, this.$select.options[i].innerHTML));
            }

            return $group;
        }

        protected updateValue(value: string): void {
            if (value === null) {
                this.setInactive();

                return;
            }

            let $options = this.$el.querySelectorAll('.select-ext-option');

            for (let i = 0; i < $options.length; i++) {
                if (($options as NodeListOf<HTMLElement>)[i].dataset['value'] === value) {
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

        protected setInactive(): void {
            this.$select.selectIndex = -1;
            this.$value.innerHTML = this.placeholder;
            this.$value.classList.remove('active');
        }

        static makeOption(value: string, text: string): HTMLElement {
            let $option = document.createElement('div');
            $option.classList.add('select-ext-option');
            $option.dataset['value'] = value;
            $option.innerHTML = text;

            return $option;
        }

    }

    return SelectExtended;
}));