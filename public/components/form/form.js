(function() {
    'use strict';

    // import
    let Button = window.Button;

    class Form {

        /**
         * Конструктор класса Form
         * @param {dict} options Насройки
         */
        constructor(options = {
            data: {}
        }) {
            this.data = options.data;
            this.validators = {};
            this.fields = {};
            this.el = options.el;

            this.render();
        }

        render() {
            this._updateHtml();
            this._installControls();
        }

        /**
         * Вернуть поля формы
         * @return {string} Строку полей ввода
         */
        _getFields() {
            let {
                fields = []
            } = this.data;

            return fields.map(field => {
                let attrs = Object.keys(field.attrs).map(attr => {
                    if (attr === 'name') {
                        this.validators[field.attrs[attr]] = field.validate;
                    }
                    return `${attr}="${field.attrs[attr]}"`;
                }).join(' ');
                return `
                    <div class="field">
    					<label for="id_${field.attrs.name}">
                        ${typeof field.label === 'undefined' ? '' : field.label}
                        </label>
    					<input id="id_${field.attrs.name}" ${attrs} />
                    </div>
                `;
            }).join(' ');
        }

        /**
         * Обновить html компонента
         */
        _updateHtml() {
            this.el.innerHTML = `
				<form>
					<h1>${this.data.title}</h1>
					<div class="js-fields">
						${this._getFields()}
					</div>
					<div class="js-controls">
					</div>
				<form>
			`;
        }

        /**
         * Вставить управляющие элементы в форму
         */
        _installControls() {
            let {
                controls = []
            } = this.data;

            controls.forEach(data => {
                let control = new Button(data).render();
                this.el.querySelector('.js-controls').appendChild(control.el);
            });
        }

        /**
         * Подписка на событие
         * @param {string} type - имя события
         * @param {function} callback - коллбек
         */
        on(type, callback) {
            if (type === 'submit') {
                this.el.addEventListener(type, event => {
                    if (this.isValid()) {
                        callback(event);
                    } else {
                        event.preventDefault();
                    }
                });
            } else {
                this.el.addEventListener(type, callback);
            }
        }

        _showError(container, errorMessage) {
            container.className = 'error';
            var msgElem = document.createElement('span');
            msgElem.className = "error-message";
            msgElem.innerHTML = errorMessage;
            container.appendChild(msgElem);
        }

        _resetError(container) {
            container.className = '';
            if (container.lastChild.className === "error-message") {
                container.removeChild(container.lastChild);
            }
        }

        /**
         * Проверка валидности полей и установка значений для getFormData
         * @return {boolean} Валидна ли форма
         */
        isValid() {
            let valid = true;
            let form = this.el.querySelector('form');
            let elements = form.elements;

            for (var i = 0; i < this.data.fields.length; i++) {
                let element = Object.keys(elements)[i];
                let name = elements[element].name;
                let value = elements[element].value;

                if (!name) {
                    return;
                }

                this._resetError(elements[element].parentNode);

                if (typeof this.validators[name] !== 'undefined') {
                    let error = this.validators[name](value);
                    console.log(value);
                    if (typeof error !== 'undefined') {
                        valid = false;
                        this._showError(elements[element].parentNode, error);
                    }
                }

                this.fields[name] = value;
            }

            return valid;
        }

        /**
         * Взять данные формы
         * @return {object} Возвращает словарь значений
         */
        getFormData() {
            return this.fields;
        }

    }

    // export
    window.Form = Form;
})();
