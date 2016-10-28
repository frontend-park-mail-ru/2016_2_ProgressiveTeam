(function () {
	'use strict';

	// import
    const Block = window.Block;
    const User = window.User;
    const Collection = window.Collection;

	class ItemList extends Block {

		constructor({el, Model, template, data = {}}) {
			super('div');
			this.template = template;

            this.collection = new Collection(Model);
            this.Model = Model;
			this._el = el;
            this.data = data;

			this.init();
			this.render();
		}

		/**
		 * Инициализация составных компонент
		 */
		init() {
			this._updateHtml();
            this.loadData();
		}

		/**
		 * Обновление внешнего вида
		 */
		render() {
			this._renderItems();
		}

		/**
		 * Обновить данные компонента
		 * @param {Object} data - данные компонента
		 * @returns {Chat}
		 */
		set(data) {
			this.collection.setData(data);
			return this.render();
		}

		/**
		 * Обновляем HTML элемента
		 */
		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		}

    	/**
    	 * Обновляем список объектов
    	 * @return {[type]} [description]
    	 */
    	_renderItems() {
    		let wrapper = this._el.querySelector('.js-items');

    		wrapper.innerHTML = this.template({
    			block: 'list_items',
    			data: this.collection.objects
    		});

    		wrapper.scrollTop = wrapper.scrollHeight;
		}

        /**
         * Загрузка данных
         */
        loadData() {
            this.collection.loadData()
                .then(() => {
                    this._renderItems();
                });
        }
	}

	//export
	window.ItemList = ItemList;
})();
