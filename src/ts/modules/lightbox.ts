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
        root.Lightbox = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Lightbox implements LightboxInterface {
        public options: LightboxOptions;

        constructor(options: LightboxOptions) {

            if (!options.targets) {
                throw new Error('No targets')
            }

            this.options = options;
            this.options.targets = typeof options.targets === 'string' ? document.querySelectorAll(options.targets) : options.targets;
            this.initClasses();
            this.initClone();
            this.initClose();
        }

        private initClasses(): void {
            this.options.targets.forEach(function (target: HTMLImageElement) {
                target.classList.add('lightbox');
            });
        }

        private initHTML(target: HTMLImageElement, position: ImagePositionOptions): void {
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
            clone.style.height = target.naturalHeight + 'px';

            setTimeout(() => {
                clone.classList.add('centered');
            }, 100);

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
                    that.initHTML(e.target as HTMLImageElement, Lightbox.getTargetPosition(target));
                })
            });
        }

        static getTargetPosition(target: HTMLImageElement): ImagePositionOptions {
            let targetPosition = target.getBoundingClientRect();

            return {
                top: targetPosition.top,
                left: targetPosition.left
            }
        }

        protected initClose(): void {
            this.bodyClose();
            this.scrollClose();
        }

        static close(): void {
            let wrapper = document.querySelector('.lightbox-clone-wrapper');

            if(wrapper) {
                let clone = wrapper.querySelector('.lightbox-clone')!;
                clone.classList.remove('centered');

                setTimeout(() => {
                    wrapper!.remove();
                }, 500);
            }
        }

        protected bodyClose(): void {
            let that = this;

            document.addEventListener('click', function (e) {
                e.preventDefault();

                if((e.target as HTMLElement).closest('.lightbox-clone-wrapper')) {
                    Lightbox.close();
                }
            });
        }

        protected scrollClose(): void {
            let that = this;

            document.addEventListener('scroll', function () {
                Lightbox.close();
            });
        }
    }

    return Lightbox;
}));

