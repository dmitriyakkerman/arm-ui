[![Build Status](https://travis-ci.org/dmitriyakkerman/arm-ui.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/arm-ui)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/dmitriyakkerman/arm-ui/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dmitriyakkerman/arm-ui/?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Example:

Styles:  
    
    <link rel="stylesheet" href="./dist/css/arm-ui.min.css">

Require:

    const ArmUI = require('arm-ui');
    
With ES6 import:    
    
    import ArmUI from './dist/js/arm-ui.min.js'       
    or    
    import {Accordion, Tabs, Popup, SelectExtended, Dropdown} from './dist/js/arm-ui.min.js'
    
Script:

    <script src="./dist/js/arm-ui.min.js"></script>
    
Markup:

    Accordion

    <div class="accordion">
        <div>Question1</div>
        <div>Answer1</div>
    </div>      
    
    Tabs  
        
    <ul class="tabs">
        <li>
            <a href="" data-pane="pane-1">Link 1</a>
        </li>
        <li>
            <a href="" data-pane="pane-2">Link 2</a>
        </li>
    </ul>
    <div id="pane-1">Content 1</div>
    <div id="pane-2">Content 2</div>   
        
    Popup      
        
    <div class="popup">
        <div>Popup text</div>
    </div>
    <a href="#" class="j-popup">Show popup</a>   
     
    Select
        
    <select class="my-select" data-placeholder="Выберите опцию">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
           
    Dropdown             
           
    <div id="dropdown-lang" class="dropdown">
      <a href="#" class="toggler">Some text</a>
      <ul class="dropdown__content">
        <li>
          <a href="">111</a>
        </li>
      </ul>
    </div>
    
    Lightbox
    
    <img src="image.jpg">   
 
Initialization:
           
    Accordion   
        
    new ArmUI.Accordion({
        el: '.accordion',
        openOneCloseAll: false
    });
       
    or
        
    new ArmUI.Accordion();  -> default initialization by root element/elements with className "accordion"
     
    Popup
        
    new ArmUI.Popup({
        el: '.popup',
        openers: '.j-popup',
        closable: true,
        onLoad: function() {},
        onOpen: function() {},
        onClose: function() {}
    });
        
    Tabs    
        
    new ArmUI.Tabs({
        tabTogglers: '.tabs a',
        onLoad: function() {}
    })
        
    or
        
    new ArmUI.Tabs();    -> default initialization by root element/elements with className "tabs"
       
    Select 
     
    new ArmUI.SelectExtended('.my-select', {
        containerClass: 'additional-class',
        multiSelect: false,
        multiSelectedText: 'Выбрано',
        onChange: function() {}
    });   
    
    Dropdown   
    
    new ArmUI.Dropdown('#dropdown-lang', {
        togglers: document.querySelectorAll('.toggler'),
        bodyClose: true,
        opened: false,
        onOpen: function() {},
        onClose: function() {}
    });
    
    Lightbox
    
    new ArmUI.Lightbox({
        targets: 'img'
    });
