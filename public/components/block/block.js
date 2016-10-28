(function () {
	'use strict';

	class Block {
		constructor(name, options = {}) {
			this._el = document.createElement(name);
			this.setAttrs(options.attrs);
			this.setClasses(options.classes);

			if (options.on) {
				options.on.forEach(event => {
					this.on(event.type, event.callback);
				});
			}

			this._options = options;
		}

		setAttrs(attrs = {}) {
			Object.keys(attrs).forEach(name => {
				this._el.setAttribute(name, attrs[name]);
			});
		}

		setClasses(classes = []) {
			let class_str = '';

			classes.forEach(class_name => {
				class_str += class_name + ' ';
			});

			this._el.className = class_str;
		}

		renderTo(element) {
			element.appendChild(this._el);
		}

		append(element) {
			if (element instanceof Block) {
				this._el.appendChild(element._get());
			} else {
				this._el.appendChild(element);
			}
		}

		/**
		 * Подписка на событие
		 * @param {string} type - имя события
		 * @param {function} callback - коллбек
		 */
		on(type, callback) {
			this._el.addEventListener(type, callback);
		}

		/**
		 * Отписка от события
		 * @param {string} type - имя события
		 * @param {function} callback - коллбек
		 */
		stop(type, callback) {
			this._el.removeEventListener(type, callback);
		}

		toString() {
			return this._el.outerHTML;
		}

		_get() {
			return this._el;
		}
	}

	//   export
	window.Block = Block;
})();
