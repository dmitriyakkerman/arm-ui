import {Accordion, Tabs, Popup} from './index.js'

document.addEventListener('DOMContentLoaded', function() {

    new Accordion({
        elements: document.querySelectorAll('.accordion')
    });

    new Tabs({
        tabLinks: document.querySelectorAll('.tabs a'),
        tabContentBlocks: document.querySelectorAll('.tabs-result div')
    })

    new Popup({
        el: document.querySelector('.popup'),
        openers:  document.querySelectorAll('.j-popup'),
        closable: true
    });

});