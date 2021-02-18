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
            new Promise(function (resolve) {
                wrapper.classList.add('lightbox-clone-wrapper');
                setTimeout(resolve, Lightbox.animationTranslateSpeed);
            }).then(function () {
                wrapper.classList.add('active');
            });
            let clone = document.createElement('div');
            new Promise(function (resolve) {
                clone.classList.add('lightbox-clone');
                clone.style.top = position.top + 'px';
                clone.style.left = position.left + 'px';
                clone.style.width = target.naturalWidth + 'px';
                setTimeout(resolve, Lightbox.animationTranslateSpeed);
            }).then(function () {
                clone.classList.add('centered');
            });
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
                    that.initHTML(e.target, that.getTargetPosition(target));
                    that.scrollClose(target);
                });
            });
        }
        getTargetPosition(target) {
            let targetPosition = target.getBoundingClientRect();
            return {
                top: targetPosition.top,
                left: targetPosition.left
            };
        }
        bodyClose() {
            document.addEventListener('click', function (e) {
                e.preventDefault();
                if (e.target.closest('.lightbox-clone-wrapper')) {
                    let wrapper = document.querySelector('.lightbox-clone-wrapper');
                    if (wrapper) {
                        let clone = wrapper.firstElementChild;
                        new Promise(function (resolve) {
                            clone.classList.remove('centered');
                            setTimeout(resolve, Lightbox.animationCloseSpeed);
                        }).then(function () {
                            wrapper.remove();
                        });
                    }
                }
            });
        }
        scrollClose(target) {
            document.addEventListener('scroll', function () {
                let targetPosition = target.getBoundingClientRect();
                let wrapper = document.querySelector('.lightbox-clone-wrapper');
                if (wrapper) {
                    let clone = wrapper.firstElementChild;
                    new Promise(function (resolve) {
                        clone.classList.remove('centered');
                        clone.style.top = targetPosition.top + 'px';
                        clone.style.left = targetPosition.left + 'px';
                        setTimeout(resolve, Lightbox.animationCloseSpeed);
                    }).then(function () {
                        if (clone.style.top === targetPosition.top + 'px' && clone.style.left === targetPosition.left + 'px') {
                            wrapper.remove();
                        }
                    });
                }
            });
        }
    }
    Lightbox.animationCloseSpeed = 350;
    Lightbox.animationTranslateSpeed = 100;
    return Lightbox;
}));
