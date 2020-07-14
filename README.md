[![Build Status](https://travis-ci.org/dmitriyakkerman/arm-ui.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/arm-ui)

Example:

Styles:  
    
    <link rel="stylesheet" href="./dist/css/arm-ui.min.css">
    
Markup:

    <div class="accordion">
        <div>Question1</div>
        <div>Answer1</div>
    </div>
    <div class="accordion">
        <div>Question2</div>
        <div>Answer2</div>
    </div>    
    
    ------------------------------    
        
    <ul class="tabs">
        <li>
            <a href="" data-pane="pane-1">Link 1</a>
        </li>
        <li>
            <a href="" data-pane="pane-2">Link 2</a>
        </li>
    </ul>
    <div class="tab-pane" id="pane-1">Content 1</div>
    <div class="tab-pane" id="pane-2">Content 2</div>   
    
    -------------------------------       
        
    <div class="popup">
        <div>Popup text</div>
    </div>
    <a href="#" class="j-popup">Show popup</a>
    
    --------------------------------
        
    <select class="my-select" data-placeholder="Выберите опцию">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>


Modules initialization:

  With script tag:
    
    <script src="dist/js/arm-ui.min.js"></script>
      
    <script>    
        
    document.addEventListener('DOMContentLoaded', function() {
            
    Accordion   
        
    new ArmUI.Accordion({
        elements: document.querySelectorAll('.accordion'),
        onLoad: function() {}
    });
        
    Popup
        
    new ArmUI.Popup({
        el: document.querySelector('.popup'),
        openers:  document.querySelectorAll('.j-popup'),
        closable: true,
        onLoad: function() {}
    });
        
    Tabs    
        
    new ArmUI.Tabs({
        tabTogglers: document.querySelectorAll('.tabs a'),
        onLoad: function() {}
    })
        
    or
        
    new ArmUI.Tabs()
       
    Select 
     
    new ArmUI.SelectExtended(document.querySelector('.my-select'), {
        containerClass: 'additional-class',
        multiSelect: false,
        onChange: function() {},
        onLoad: function() {}
    });
           
    </script>

Require:

    const ArmUI = require('../src/js/arm-ui');
    
With ES6 import:    
    
    import ArmUI from './arm-ui.js'       
    or    
    import {Accordion, Tabs, Popup, SelectExtended} from './arm-ui.js'    

       
      
    
    
