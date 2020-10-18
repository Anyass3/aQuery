# aQuery
### Re-designing JQuery : If you are like me, you hate large js libraries 
##### this is minimal library similar to Jquery in some ways with somewhat fewer features but amazing
### This was a personal mini project to help me code js faster. If interested you can try it. 

# Installation
`npm i abquery --save`
## To get started quickly try the CDN:
`https://cdn.jsdelivr.net/npm/abquery@0.1.0/dist/query.min.js` 

#### `Aq` is the main class object
This is the main library
you can use it only with the new key except when accessing the static methods

#### `$` is similar to `document.querySelector` but with the Aq instance
#### `$$$` is similar to `document.querySelectorAll` but with the Aq instance
#### `$new` it's used to create a html element with the Aq instance
#### `$old` useful when you want an element to have an Aq instance as it has useful methods
#### `$many` it the plural of `$old`

## getting started using npm:
##### import what you need
```
import {Aq, $, $$$, $new, $old, $many} from "abquery"

#query selector

$("a")
$("a").$$ // ths will get the actual element 
$(['a','#navlink','p']) //this queries each of those selectors in one instance


#query selectorAll

$$$('a')

#new element

$new('a')
$new('a',many=false) default

#create 10 anchor tags and append it to a div

let div=$('div')
let anchors=$new('a',10)
anchors.appendParent(div.$$) || div.append(anchors.$$)
anchors.addClass('d-none')
anchors.addclass(['d-none','btn', 'btn-link'])
anchors.class //this will get the className of all the anchors
anchors.class="btn-link d-none" //this will set the className of all the anchors
anchors.rmClass('d-none')
anchors.toggleClass
```
// let say there are elements/anchors with a data-toggle="modal" and a data-target property that is equal to a query to toggle
// like how bootstrap declares its modals
```
$$$("[data-toggle=modal]").on('click',(e)=>$(`${$old(e.target).attr("data-target")}`).toggleClass("show"))

```
### here are cool methods and properties
```
.run //this will run a func for all element queried
.prop //to get or set any property 
.attr //to get or set any attributes. to get multiple attrs pass in a list of attrs
        // to set multiple attrs pass in an object
    .attr('id')//to get 
    .attr('id','hmm')//to set id to hmm
    .rmAttr('id')// to remove/del an attr
    #attrs functions similar to prop
.hide .show .toggleDisplay #these are self explainatory

.html //to get or set the innerHTML
.text //to get or set the textContent
.val //to get or set form inputs or textarea or files or checkboxes or radios etc
    //you do not need to think whether it is .value or .checked or .files etc. it will do the job for you
    //NOTE: NOT ALL INPUT TYPES CAN BE SET
```
### dealing with styles
```
.css('width')//to get the width
.css('width','100%') // to set the width to 100%
.css('width','100%',true) //to set it as important
.css(['margin-top','height','display']) //to get those values
.css({width:"100%",display:"flex !important"})// to set it
```
### to add a new element or new query to a query or any instance of Aq
```
$("div#main").$new('p').text='this a new paragraph'
$("div#main").$('p').run(e=>console.log(e))
$("div#main").$$$("p").on('mouseover',e=>console.log(e)).on('click',func).prop('offsetWidth') // to querySelcetorAll p tags in the div
```
## You can check the code to see the other methods
##### Get a form data without hussle
```
$("form").$$$(["input","select","textarea"]).val //this will return an object which can directly be sent to the server
## NOTE: the inputs should have a name or id attrs set
```
!!!ENJOY
### so much more to come
Like modal time-ago tooltips fetch etc
## issues are most welcomed
