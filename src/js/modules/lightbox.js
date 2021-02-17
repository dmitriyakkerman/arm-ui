"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals/globals");
(function (root, factory) {
    if (typeof globals_1.define === 'function' && globals_1.define.amd) {
        globals_1.define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.Lightbox = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class Lightbox {
        constructor(options) {
            if (!options.targets) {
                throw new Error('No targets');
            }
            this.options = options;
            this.options.targets = typeof options.targets === 'string' ? document.querySelectorAll(options.targets) : options.targets;
            this.initClasses();
            this.initClone();
            this.bodyClose();
        }
        initClasses() {
            this.options.targets.forEach(function (target) {
                target.classList.add('lightbox');
            });
        }
        initHTML(target, position) {
            let wrapper = document.createElement('div');
            wrapper.classList.add('lightbox-clone-wrapper');
            setTimeout(() => {
                wrapper.classList.add('active');
            }, 100);
            let clone = document.createElement('div');
            clone.classList.add('lightbox-clone');
            clone.style.top = position.top + 'px';
            clone.style.left = position.left + 'px';
            clone.style.width = target.naturalWidth + 'px';
            setTimeout(() => {
                clone.classList.add('centered');
            }, 100);
            let cloneImg = document.createElement('img');
            cloneImg.src = target.src;
            clone.appendChild(cloneImg);
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);
        }
        initClone() {
            let that = this;
            this.options.targets.forEach(function (target) {
                target.addEventListener('click', function (e) {
                    that.initHTML(e.target, Lightbox.getTargetPosition(target));
                    that.scrollClose(target);
                });
            });
        }
        static getTargetPosition(target) {
            let targetPosition = target.getBoundingClientRect();
            return {
                top: targetPosition.top,
                left: targetPosition.left
            };
        }
        bodyClose() {
            let that = this;
            document.addEventListener('click', function (e) {
                e.preventDefault();
                if (e.target.closest('.lightbox-clone-wrapper')) {
                    let wrapper = document.querySelector('.lightbox-clone-wrapper');
                    if (wrapper) {
                        let clone = wrapper.querySelector('.lightbox-clone');
                        clone.classList.remove('centered');
                        setTimeout(() => {
                            wrapper.remove();
                        }, 700);
                    }
                }
            });
        }
        scrollClose(target) {
            document.addEventListener('scroll', function () {
                let targetPositionTop = target.getBoundingClientRect().top;
                let wrapper = document.querySelector('.lightbox-clone-wrapper');
                if (wrapper) {
                    let clone = wrapper.querySelector('.lightbox-clone');
                    clone.classList.remove('centered');
                    clone.style.top = targetPositionTop + 'px';
                    setTimeout(() => {
                        wrapper.remove();
                    }, 750);
                }
            });
        }
    }
    return Lightbox;
}));
