
# abQuery v 0.3.4
### Re-designing JQuery : If you are like me, you hate large js libraries 
this is minimal library similar to Jquery in some ways with somewhat fewer features but amazing

It was a personal mini project to help me code js faster. If interested you can try it. 

## Prerequisites:
` just a basic javascript knowledge`

# Installation

To get started quickly try the CDN instead:

compiled with babel for browser compatibility
[https://cdn.jsdelivr.net/npm/abquery@0.3.4/dist/index.min.js]

or may only be compatible for modern browsers.
[https://cdn.jsdelivr.net/npm/abquery@0.3.4/dist/mb.index.min.js]

## getting started using npm:
`npm i abquery --save`

`import $ from "abquery"`
##### or
`const $ = require("abquery")` 

#### NOTE: for some hide and show animation features you have to run this:
`$.init_style_defaults()`
this is only for npm, for the cdn no need

# usage and api
#### `$` is the main object :: Library

##### `$('query')` is similar to `document.querySelector` but with the $ instance
##### `$('*query')` is similar to `document.querySelectorAll` but with the $ instance
##### `$.new(tagname) or $('<tagname>')` it's used to create a html element with the $ instance

##### `$(el)` useful when you want an element to have an $ instance as it has useful methods
the arg (el) can be a NodeList or an element or even a list/array of  elements


### query selector
```javascript
$("a")
$("a").$$ // ths will get the actual element 
$("a, #navlink, p") //this queries each of those selectors in one instance
```

### query selectorAll
```javascript
$('*a')
$('* a, .nav-link') // select all _a_ tags and .nav-link in one instance
```
### create new element
```javascript
$.new('a') or $("<a>")
$.new('a',num=1) default
```
##### eg: create 10 anchor tags and append it to a div
```javascript
let div=$('div')
let anchors=$('<a>',10)
anchors.appendParent(div.$$) || div.append(anchors.$$)
```
### existing elements
```javascript
$(el)
# usages example
$('*div').on('click',(ev)=>{
        ev // this is a click event
        let e=ev.target // to get the actual element
        $(e).toggleClass("class1,class2,etc").show().attr('id','IDname')
})
```

### Getting actual elements
use `.$$` to get the actual element or nodeList(for selectorAll)

use `.arr[index]` to get an element an a particular index
        eg: ```javascript
        $('*div').arr[0] //first element
        $('*div').arr[10] //element at index 10
        ```
### getting new single instances of $ from a query
use `[index]` to get element as an instance of $ at a particular index
        eg: ```javascript
        $('*div')[0] //first element as an instance
        $('*div')[10] //element at index 10 as an instance
        ```

#### classes
```javascript
.addClass(cls)
.rmClass(cls)
.toggleClass(cls)

.class //this will get the className of all the anchors
.class="btn-link d-none" //this will set the className of all the anchors

.hasClass(cls,{someClass: false, someEl: false}) # default
        eg: .hasClass('d-none') // checking a single class
            .hasClass("class1, class1",{someClass=false,someEl=false})
                someEl will be useful if you queried many elements in an instance of $
                 if false returns true only if all the elements have the class
                 else returns true if atleast an element has the class
                someClass is a similar logic like someEl
```
## here are some cool methods and properties
getting or setting properties or attributes
```javascript
.prop //to get or set any property 
.attr //to get or set any attributes. 

 to GET multiple pass in a list of attrs eg: .attr('attr1,attr2,etc') || .prop('prop1,prop2,etc')
 to SET multiple attrs pass in an object eg: .attr({id:'man',etc}) || prop({width:'56px',etc})
 .attr('id')//to GET a single =>SAME for prop
 .attr('id','hmm')//to SET id to hmm : setting single =>SAME for prop
 .rmAttr('id') // to remove/del an attr
```
###### attrs functions similar to props but different
`attr('id') and .prop('id') gives the same result`
but `.attr('style')` returns the style string and `.prop('style')` returns the style object

NB: this has notthing to do with this mini library, thant's how js works

### hiding and showing elements
```javascript
.hide() .show() // it does just that
  it can accept params
    ({cls='class-to-show-or-hide',animate='your-animate-class',delay=600,keep=false}={},func_to_run_after)
       delay is the delay time
       keep if true the animate class will be kept else it will be remove after
.toggleDisplay() // it does just that
```
### eventListeners
`.on('click', func)` //single listener

`.on("mouseover, mouseout, click", func)` // multiple listeners

You can also write it like this: `.on(['mouseover','mouseout','click'], func)`

### dealing with styles
```javascript
.css('width')//to get the width
.css('width','100%') // to set the width to 100%
.css('width','100%',true) //to set it as important
.css("margin-top,height,display") //to get those values
.css({width:"100%",display:"flex !important"})// to set it
```
### to add a new element or new query to a query or any instance of $
`.$(query) similar to .find in jQuery but you have to prepend '*' for selectorAll
and .$new` of an instance of $
```javascript
$("div#main").$new('p').text='this a new paragraph'

NOTE:
   $("div#main").$.new('p') // will not work
        because $.new is a static method so it 
        be called on an instance of $
        so use in case of an instance of $:
           eg:$("div#main").$new('p') or  
              $("div#main").$('<p>')

// find the p tag in the div#main
$("div#main").$('p')

// find all the p tag in the div#main
$("div#main").$("*p") // to querySelcetorAll p tags in the div
```
$() will query the document as an instance

().$$ equals to document

### some methods
```javascript
 .run //this will run a func for all or the element queried
        eg: .run(func) || .run(e=>{})
 
 .$run //this will run a func for all or the element queried against a variable or array
        eg: .$run(func,arr) || $run((e,var||array_item)=>{},var||array)

 .append // to append a child node/element

 .appendParent // to append to a parent node/element

 .detach // to detach or remove a child node/element

 .detachParent // to detach self from a parent node/element
 .on(event,func) similar to .addEventListener(event,func)
 .debounce 
      $().debounce('mouseover',(e)=>{
        console.log(e.clientX,e.clientY)
      },2000)
 .throttle
      $().throttle('mouseover',(e)=>{
        console.log(e.clientX,e.clientY)
      },2000)
    // if you don't debounce and throttle
    // you may ask Google
    // it's very useful
```
#### some properties getters and setters
```javascript
 .len // to get the length of the query

 .index // to get the index of an element or instance of $ in a query 
 useful for query selectorAll

 .html //to get or set the innerHTML

 .text //to get or set the textContent

 .val //to get or set form inputs or textarea or files or checkboxes or radios etc
    //you do not need to think whether it is .value or .checked or .files etc. it will do the job for you
    
    NOTE: NOT ALL INPUT TYPES CAN BE SET
    

 .children // to get children nodes
  
 .parent // to get an element/node's parent

 .parents // similar to .parent but usefull querySelectorAll/$(*q)
 ```
 ### other getters and setters
 ```javascript
 ["title", "lang", "translate", "dir", "hidden", "accessKey", "draggable", "spellcheck", "autocapitalize", "contentEditable", "isContentEditable", "inputMode", "offsetParent", "offsetTop", "offsetLeft", "offsetWidth", "offsetHeight", "innerText", "outerText", "dataset", "nonce", "autofocus", "tabIndex", "attachInternals", "enterKeyHint"]
 ```
### some useful static methods
```javascript
$.new(tagname) // to create a new element 
$.id(id) // similar to document.getElementById(id)
        $.id('id1,id2,etc') or $.id('id1')
$.cls(cn) // similar to document.getElementsByClassName(cn)
        $.cls('cn1,cn2,etc') or $.cls('cn1')
$.attrs('attr' or 'attr=value') it can be used to get all element by that attr or "attr=value"
        similar to document.querySelectorAll("[attr or attr=value]")
        $.attrs('attr=val,attr2=val,etc') or $.attrs('attr=val')

$.form_value(input_element) 
        gets the value whether its .checked,.value, select fields

$.form_data(list_of_inputs)
        similar to above but returns an object

$.css_prefix('css style')
        eg: $.css_prefix("transform: scale(.8)")

            returns=> transform: scale(.8);-webkit-transform: scale(.8);-moz-transform: scale(.8);

$.gen_frames(name,frames) 
        it will generate keyframes
        eg: $.gen_frames('animatekf',`0% {${$.css_prefix('transform: scale(1)')}opacity: 1;} 100%{opacity: 0}`)

        returns=>  
        @keyframes animatekf {0% {transform: scale(1);-webkit-transform: scale(1);-moz-transform: scale(1);opacity: 1;} 100%{opacity: 0}}
        @-webkit-keyframes animatekf {0% {transform: scale(1);-webkit-transform: scale(1);-moz-transform: scale(1);opacity: 1;} 100%{opacity: 0}}

$.add_keyframes(name,frames,id=$.styleElementId) 
         does just the above but adds it to the dom
         if the style element id specified does not exist
         it will create it instead
         and later append the keyframes

$.add_style(selector,rules,id=$.styleElementId)
        it is used to create a css style
        eg: to create a new class
            $.add_style('.classname','margin-top:50px;padding:20px 12px;')
            
            Now you can use that class in your elements
$.ready(func) to run the functin on DOMContentLoaded
$.on(event,func,el=document) similar to el.addEventListener(event,func)

$.throttle
        $().click($.throttle((e)=>{
                console.log(e)
        },2000))
$.debounce
        $().on('click', $.debounce((e)=>{
                console.log(e)
        },2000))
```
##### some examples
 Get a form data without hussle
```javascript
$("form").$("* input, select, textarea").val //this will return an object which can directly be sent to the server

 // NOTE: the inputs should have a name or id attrs SET eg: input type file, can only be set/added by a user interraction
```

 hide and show modals eg:
 let say there are elements/anchors with a data-toggle="modal" and a data-target property that is equal to a query to toggle
 like how bootstrap declares its modals
```javascript
$("*[data-toggle=modal]").on('click',(e)=>$(`${$(e.target).attr("data-target")}`).toggleClass("show"))

```


## You can check the code to see the methods
`src/index.js`

The compiled version `dist/index.js` and `dist/index.min.js`
or only minified version `dist/mb.index.min.js`

#### NOTE:
```javascript
multiple selectors eg:- $("#nav, a, etc") can ONLY be strings separated by commas.

BUT methods maybe list/array of strings OR strings separated by commas 
        eg:- .addClass(['hide','nav-link', etc]) or .addClass("hide, nav-link, etc")
        either is fine
Also spaces doesn't matter
Eg:- .addClass("show  ,      nav")
```
!!!ENJOY
### more to come
Like modal time-ago tooltips fetch etc
## issues are most welcomed

