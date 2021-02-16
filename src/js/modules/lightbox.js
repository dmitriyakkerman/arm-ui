class Lightbox {
    constructor(options) {
        this.targets = typeof options.targets === 'string' ? document.querySelectorAll(options.targets) : options.targets;
        this.initClasses();
        this.initClone();
        this.initClose();
    }

    initClasses() {
        this.targets.forEach(function (target) {
            target.classList.add('lightbox');
        });
    }

    initHTML(target, position) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('clone-bg');

        setTimeout(() => {
            wrapper.classList.add('active');
        }, 100);

        let clone = document.createElement('div');
        clone.classList.add('clone');
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

    initClone() {
        let that = this;
        this.targets.forEach(function (target) {
            target.addEventListener('click', function (e) {
                that.initHTML(e.target, that.getTargetPosition(target));
            })
        });
    }

    getTargetPosition(target) {
        let targetPosition = target.getBoundingClientRect();

        return {
            top: targetPosition.top,
            left: targetPosition.left
        }
    }

    initClose() {
        this.bodyClose();
        this.scrollClose();
    }

    static close() {
        let parent = document.querySelector('.clone-bg');
        let child = parent.querySelector('.clone');
        child.classList.remove('centered');

        setTimeout(() => {
            parent.remove();
        }, 500);
    }

    bodyClose() {
        let that = this;

        document.addEventListener('click', function (e) {
            e.preventDefault();

            if(e.target.closest('.clone-bg')) {
                Lightbox.close();
            }
        });
    }

    scrollClose() {
        let that = this;

        document.addEventListener('scroll', function () {
            Lightbox.close();
        });
    }
}