(function () {
	'use strict';

	class Button {
		constructor (options) {
			this.text = options.text;
			this.attrs = options.attrs || [];
			this.classes = options.classes || [];
			this.event_data = options.on;
			this.el = document.createElement('button');
		}

		setClasses (classes) {
			classes.forEach(class_name => {
				this.el.classList.add(class_name);
			})
		}

		setAttrs (attrs) {
			Object.keys(attrs).forEach(name => {
				this.el.setAttribute(name, attrs[name]);
			})
		}

		render () {
			this.el.innerHTML = this.text;
			this.el.classList.add('button');
			this.setClasses(this.classes);
			this.setAttrs(this.attrs);
			if (this.event_data) {
				this.on(this.event_data.type, this.event_data.callback);
			}
			return this;
		}

		on (type, callback) {
			this.el.addEventListener(type, callback);
		}

		toString () {
			return this.el.outerHTML;
		}
	}

	//export
	window.Button = Button;

})();
