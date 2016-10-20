(function () {
    'use strict';

    // import
    const Block = window.Block;
    const Button = window.Button;

    class Form extends Block {

        /**
         * Конструктор класса Form
         */
        constructor(options = {
            data: {}
        }) {
            super('form');
            this.template = window.fest['form/form.tmpl'];
            this.data = options.data;
            this._el = options.el || document.createElement('div');
            this.validators = this._getValidatorDict(options.data.fields);
            this.fields_data = {};
            this.render();
        }

        /**
         * Обновляем HTML
         */
        render() {
            this._updateHtml();
            this._installControls();
        }

        /**
         * Обнуляем форму
         */
        reset() {
            this._el.querySelector('form').reset();
        }

        /**
         * Обновить html компонента
         */
        _updateHtml() {
            this._el.innerHTML = this.template(this.data);
        }

        /**
         * Вставить управляющие элементы в форму
         */
        _installControls() {
            let {
                controls = []
            } = this.data;

            controls.forEach(data => {
                let control = new Button({
                    text: data.text
                });
                this._el.querySelector('.js-controls').appendChild(control._get());
            });
        }

        /**
         * Получение словаря валидаторов согласно имени поля
         */
        _getValidatorDict(field_list = []) {
            let validators = {};

            field_list.forEach(field => {
                validators[field.name] = field.validate;
            });

            return validators;
        }

        /**
         * Проверка валидности полей и установка значений для getFormData
         * @return {boolean} Валидна ли форма
         */
        isValid() {
            let valid = true;
            let form = this._el.querySelector('form');
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
                    console.log(error);
                    if (typeof error !== 'undefined') {
                        valid = false;
                        this._showError(elements[element].parentNode, error);
                    }
                }

                this.fields_data[name] = value;
            }

            return valid;
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
         * Подписка на событие
         * @param {string} type - имя события
         * @param {function} callback - коллбек
         */
        on(type, callback) {
            if (type === 'submit') {
                this._el.addEventListener(type, event => {
                    if (this.isValid()) {
                        callback(event);
                    } else {
                        event.preventDefault();
                    }
                });
            } else {
                this._el.addEventListener(type, callback);
            }
        }

        /**
         * Взять данные формы
         * @return {object} Возвращает словарь значений
         */
        getFormData() {
            return this.fields_data;
        }

        removeError() {
            this._el.removeChild(this._el.lastChild);
        }

        setError(msg) {
            let msgElem = document.createElement('span');
            msgElem.className = "error-message";
            msgElem.innerHTML = msg;
            let form = this._el.querySelector('form');
            form.insertBefore(msgElem, form.childNodes[3]);
        }
    }

    // export
    window.Form = Form;
})();
