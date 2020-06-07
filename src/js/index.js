export {
    Accordion,
    Tabs,
    Popup
}

class Accordion {
    constructor(options = {}) {

        if(!options.elements) {
            throw new Error('No accordion root selector/selectors')
        }

        this.elements = options.elements;

        this.onInit()
    }

    onInit() {
        this.addClasses();
        this.toggleState();
    }

    addClasses() {

        let that = this;

        that.elements.forEach(function(element) {
            element.classList.add('accordion')
        })
    }

    toggleState() {

        let that = this;

        that.elements.forEach(function(element) {
            element.querySelector('div:first-child').addEventListener('click', function() {
                element.classList.toggle('active')
            })
        })
    }
}

class Tabs {
    constructor(options = {}) {

        if(!options.tabLinks) {
            throw new Error('No tab link selector/selectors')
        }

        if(!options.tabContentBlocks) {
            throw new Error('No tab content selector/selectors')
        }

        this.tabLinks = options.tabLinks;
        this.tabContentBlocks = options.tabContentBlocks;

        this.onInit();
    }

    onInit() {
        this.addClasses();
        this.setCurrent();
    }

    static clearClasses() {

        let tabLinks = document.querySelectorAll('.tabs__link');
        tabLinks.forEach(function(tabLink) {
            tabLink.classList.remove('active');
        });
    }

    addClasses() {

        let that = this;

        that.tabLinks[0].classList.add('active');
        that.tabContentBlocks[0].classList.add('active');

        that.tabLinks.forEach(function(tabLink) {
            tabLink.classList.add('tabs__link')
        })

        that.tabContentBlocks.forEach(function(tabContentBlock) {
            tabContentBlock.classList.add('tabs__content')
        })
    }

    setCurrent() {

        let that = this;

        that.tabLinks.forEach(function(tabLink, tabLinkIndex) {
            tabLink.addEventListener('click', function(e) {
                e.preventDefault();

                that.constructor.clearClasses();
                tabLink.classList.add('active');

                that.tabContentBlocks.forEach(function(tabContentBlock, tabContentBlockIndex) {
                    if(tabLinkIndex === tabContentBlockIndex) {
                        tabContentBlock.classList.add('active')
                    }
                    else {
                        tabContentBlock.classList.remove('active')
                    }
                })
            })
        })
    }
}

class Popup {
    constructor(options = {}) {

        if(!options.el) {
            throw new Error('No popup root selector')
        }

        if(!options.openers) {
            throw new Error('No popup opener selector/selectors')
        }

        this.el = options.el;
        this.openers = options.openers;
        this.closable = options.closable || false;

        this.onInit();
    }

    onInit() {
        this.initHTML();
        this.initEvents();
    }

    initHTML() {
        this.el.classList.add('popup');
        this.el.firstElementChild.classList.add('popup__container');

        if(this.closable) {
            let popupClose = document.createElement('a');
            popupClose.href = '#';
            popupClose.classList.add('popup__close-btn');
            this.el.firstElementChild.appendChild(popupClose);
        }

        document.body.appendChild(this.el);

        return this.el;
    }

    initEvents() {
        this.open();
        this.close();
    }

    open() {

        let that = this;

        that.openers.forEach(function(popupOpen) {
            popupOpen.addEventListener('click', function(e) {
                e.preventDefault();
                that.el.classList.add('active');
            })
        })
    }

    close() {

        let that = this;

        that.el.addEventListener('click', function(e) {

            if (!e.target.closest('.popup__container')) {
                that.el.classList.remove('active');
            }
        })

        let popupClose = that.el.querySelector('.popup__close-btn');

        if(popupClose) {
            popupClose.addEventListener('click', function(e) {
                e.preventDefault();
                that.el.classList.remove('active');
            })
        }
    }
}