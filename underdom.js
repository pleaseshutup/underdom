Node.prototype._css = function(css){
	for(var k in css){ this.style.setProperty(k, css[k]); }
	return this;
}
Node.prototype._attr = function(attr){
	for(var k in attr){ !attr[k] && attr[k] !== 0 ? this.removeAttribute(k) : typeof attr[k] === 'boolean' ? this[k] = attr[k] : this.setAttribute(k, attr[k]); }
	return this;
}
Node.prototype._text = function(text){
	this.textContent = text || '';
	return this;
}
Node.prototype._html = function(html){
	this.innerHTML = html || '';
	return this;
}
Node.prototype._appendTo = function(target){
	return target.appendChild(this);
}
Node.prototype._append = function(el){
	this.appendChild(el);
	return this;
}
Node.prototype._on = function(ev, fn){
	this.addEventListener(ev, fn);
	return this;
}
NodeList.prototype.__proto__ = Array.prototype;
var underdom_methods = ['_css', '_attr', '_text', '_html', ')appendTo', ')append', '_on'];
underdom_methods.forEach(function(method){
	NodeList.prototype[method] = HTMLCollection.prototype[method] = function(arg1, arg2){
		for (var i = this.length - 1; i >= 0; i--) {
			this[i][method](arg1, arg2);
		}
		return this;
	}
});

