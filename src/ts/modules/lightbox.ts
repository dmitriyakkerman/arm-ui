import {define} from "../globals/globals";
import {LightboxInterface} from "../interfaces/LightboxInterface";
import {LightboxOptions} from "../types/LightboxOptions";
import {ImagePositionOptions} from "../types/internal/ImagePositionOptions";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root!.Lightbox = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Lightbox implements LightboxInterface {
        public options: LightboxOptions;
        static animationCloseSpeed: number = 500;
        static animationTranslateSpeed: number = 150;

        constructor(options: LightboxOptions) {

            if (!options.targets) {
                throw new Error('No targets')
            }

            this.options = options;
            this.options.targets = typeof options.targets === 'string' ? document.querySelectorAll(options.targets) : options.targets;
            this.initClasses();
            this.initClone();
            this.bodyClose();
        }

        private initClasses(): void {
            this.options.targets.forEach(function (target: HTMLImageElement) {
                target.classList.add('lightbox');
            });
        }

        private initHTML(target: HTMLImageElement, position: ImagePositionOptions): void {
            let wrapper = document.createElement('div');

            new Promise(function (resolve) {
                wrapper.classList.add('lightbox-clone-wrapper');

                setTimeout(resolve, 100);
            }).then(function () {
                wrapper.classList.add('active');
            });

            let clone = document.createElement('div');

            new Promise(function (resolve) {
                clone.classList.add('lightbox-clone');
                clone.style.top = position.top + 'px';
                clone.style.left = position.left + 'px';
                clone.style.width = target.naturalWidth + 'px';

                setTimeout(resolve, 100);
            }).then(function () {
                clone.classList.add('centered');
            });

            let cloneImg = document.createElement('img');
            cloneImg.src = target.src;

            clone.appendChild(cloneImg);
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);
        }

        private initClone(): void {
            let that = this;

            this.options.targets.forEach(function (target: HTMLImageElement) {
                target.addEventListener('click', function (e) {
                    that.initHTML(e.target as HTMLImageElement, that.getTargetPosition(target));

                    that.scrollClose(target);
                })
            });
        }

        protected getTargetPosition(target: HTMLImageElement): ImagePositionOptions {
            let targetPosition = target.getBoundingClientRect();

            return {
                top: targetPosition.top,
                left: targetPosition.left
            }
        }

        protected bodyClose(): void {
            document.addEventListener('click', function (e) {
                e.preventDefault();

                if((e.target as HTMLElement).closest('.lightbox-clone-wrapper')) {
                    let wrapper = document.querySelector('.lightbox-clone-wrapper') as HTMLElement;

                    if(wrapper) {
                        let clone = wrapper.firstElementChild as HTMLElement;

                        new Promise<void>(function (resolve) {
                            clone.classList.remove('centered');

                            setTimeout(resolve, Lightbox.animationCloseSpeed);
                        }).then(function () {
                            wrapper.remove();
                        });
                    }
                }
            });
        }

        protected scrollClose(target: HTMLImageElement) {
            setTimeout(function(){
                Lightbox.runOnce(document, 'scroll', function () {
                    let targetPosition = target.getBoundingClientRect();
                    let wrapper = document.querySelector('.lightbox-clone-wrapper') as HTMLElement;

                    if(wrapper) {
                        let clone = wrapper.firstElementChild as HTMLElement;

                        new Promise<void>(function (resolve) {
                            clone.classList.remove('centered');
                            clone.style.top = targetPosition.top + 'px';
                            clone.style.left = targetPosition.left + 'px';

                            setTimeout(resolve, Lightbox.animationCloseSpeed);
                        }).then(function () {
                            if((clone.style.top === targetPosition.top + 'px') && (clone.style.left === targetPosition.left + 'px')) {
                                wrapper.remove();
                            }
                        });
                    }
                });
            }, Lightbox.animationCloseSpeed);
        }

        static runOnce(node: Node, type: string, callback: EventListener) {
            node.addEventListener(type, function(e) {
                e.target!.removeEventListener(e.type, callback);
                return callback(e);
            });
        }
    }

    return Lightbox;
}));