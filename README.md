# underdom
Underdom is a minimalist helper library to make writing vanilla javascript DOM manipulation just a bit easier with some chaining while still making it completely compatible with the vanilla DOM API.

### Why ?
Sprinkle in the convenience of chaining common DOM methods in 855 bytes

#### Before (one element)
``` javascript
var el = document.createElement('div');
    el.style.display = 'inline-block';
    el.style.padding = '10px';
    el.className = 'blocky';
    el.setAttribute('data-showing', '1');
    el.addEventListener('click', function(e) {
        console.log('clicked', e);
    })
    document.body.appendChild(div);
```

#### After
``` javascript
var el = document.createElement('div')
    .css({display: 'inline-block', padding: '10px'})
    .attr({class: 'blocky', 'data-showing': '1'})
    .on('click', function(e) {
        console.log('clicked');
    })
    .appendTo(document.body);
```

#### Before (multiple elements)
``` javascript
var el1 = document.createElement('div');
for (var i=0; i<10; i++) {
    var subel = document.createElement('div');
    subel.style.display = 'inline-block';
    subel.style.padding = '10px';
    subel.style.width = '33%';
    subel.style.textContent = 'Box ' + (i+1);
    el1.appendChild(subel);
}
[].slice.call(el1.getElementsByTagName('div')).forEach(function(subel){
    subel.style.width = '50%';
})
```

#### After (multiple elements)
``` javascript
var el1 = document.createElement('div');
for (var i=0; i<10; i++) {
    // no variable created
    document.createElement('div')
    .css({display: 'inline-block', padding: '10px', width: '33%'})
    .text('Box '+(i+1))
    .appendTo(el1);
}
el1.getElementsByTagName('div').css({width: '50%'})
```

# Where it shines!
###### underdom really shines when you are creating a lot of elements and trying to do things with them -- [check this out!][0]
``` javascript
document.body.html('')
for(i =0; i< 10; i++){
    document.createElement('div').css({padding: '4px 10px'})
    .append(
        document.createElement('label')
        .append(
            document.createElement('input').attr({type: 'checkbox'}).css({display: 'inline-block', 'vertical-align':'top'}).on('change', function(e){
                console.log('Option', (i+1), 'changed')
                e.target.parentNode.parentNode.css({'background-color': e.target.checked ? 'red' : 'blue'})
            })
        )
        .append(
            document.createElement('span').text('Option '+(i+1)).css({display: 'inline-block', 'vertical-align':'top'})
        )
    )
    .appendTo(document.body)
}
```

### Methods

Each of these methods returns the DOM node so they can be chained

| name | arguments | description | example |
| --- | --- | --- | --- |
| css | _css_ | sets the style properties of the node(s) using an object with each style property as the key, similar to jquery but only supports objects | `document.querySelectorAll('span').css({background: 'red', 'font-size': '12px'})`
| attr | _attr_ | sets the attribute properties of the node(s) using an object with each attribute name as the key, similar to jquery but only supports objects | `document.getElementsByTagName('input').css({checked: true, 'data-color': 'blue'})`
| text | _text_ | sets the .textContent of the node(s) | `document.getElementsByClassName('items').text('Hello')`
| html | _html_ | sets the .innerHTML of the node(s) | `document.querySelectorAll('div[data-color="blue"]').html('<span>hi</span>')`
| appendTo | _target_ | appends the element to the _target_ DOM node(s) | `document.createElement('div').html('<span>hi</span>').appendTo(document.body)`
| append | _child_ | appends _child_ to the node(s) | `document.body.append(document.createElement('div').text('hello'))`
| on | _ev_, _fn_ | does document.addEventLisenter(_ev_, _fn_) to the node(s) | `document.getElementsByTagName('input').on('change', function(e){ console.log('checked', e.target.checked); })`


### How to use this?
###### Option 1. paste the minified code into your project
``` javascript 
Node.prototype.appendTo=function(t){return t.appendChild(this),this},Node.prototype.append=function(t){return this.appendChild(t),this},Node.prototype.text=function(t){return this.textContent=t||"",this},Node.prototype.html=function(t){return this.innerHTML=t||"",this},Node.prototype.css=function(t){for(var o in t)this.style.setProperty(o,t[o]);return this},Node.prototype.attr=function(t){for(var o in t)t[o]||0===t[o]?"boolean"==typeof t[o]?this[o]=t[o]:this.setAttribute(o,t[o]):this.removeAttribute(o);return this},Node.prototype.on=function(t,o){return this.addEventListener(t,o),this},NodeList.prototype.__proto__=Array.prototype;var methods=["css","attr","appendTo","append","text","html"];methods.forEach(function(t){NodeList.prototype[t]=HTMLCollection.prototype[t]=function(o,e){for(var r=this.length-1;r>=0;r--)this[r][t](o,e);return this}});
```

###### Option 2. RawGit
``` html
<script src="https://cdn.rawgit.com/pleaseshutup/underdom/master/dist/underdom.min.js"></script>
```

###### Option 3: ???
I don't ever use front-end bundlers so I need to be educated


### License
MIT

[0]: https://cdn.rawgit.com/pleaseshutup/underdom/master/test.html