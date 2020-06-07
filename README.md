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
            <a href="#1">Link1</a>
        </li>
        <li>
            <a href="#2">Link2</a>
        </li>
    </ul>       
    <div class="tabs-result">
        <div>1</div>
        <div>2</div>
    </div>    
    
    -------------------------------       
        
    <div class="popup">
        <div></div>
    </div>
    <a href="#" class="j-popup">Show popup</a>

Modules initialization:

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
       
      
    
    