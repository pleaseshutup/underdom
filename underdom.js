
Node.prototype.appendTo = function(target){
	target.appendChild(this);
	return this;
}
Node.prototype.append = function(el){
	this.appendChild(el);
	return this;
}
Node.prototype.text = function(text){
	this.textContent = text || '';
	return this;
}
Node.prototype.html = function(html){
	this.innerHTML = html || '';
	return this;
}
Node.prototype.css = function(css){
	for(var k in css){ this.style.setProperty(k, css[k]); }
	return this;
}
Node.prototype.attr = function(attr){
	for(var k in attr){ !attr[k] && attr[k] !== 0 ? this.removeAttribute(k) : typeof attr[k] === 'boolean' ? this[k] = attr[k] : this.setAttribute(k, attr[k]); }
	return this;
}
Node.prototype.on = function(ev, fn){
	this.addEventListener(ev, fn);
	return this;
}
NodeList.prototype.__proto__ = Array.prototype;
var underdom_methods = ['css', 'attr', 'appendTo', 'append', 'text', 'html', ];
underdom_methods.forEach(function(method){
	NodeList.prototype[method] = HTMLCollection.prototype[method] = function(arg1, arg2){
		for (var i = this.length - 1; i >= 0; i--) {
			this[i][method](arg1, arg2);
		}
		return this;
	}
});
