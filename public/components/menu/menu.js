(function () {
    'use strict';

    // import
    const Block = window.Block;
    const LinkButton = window.LinkButton;

    class Menu extends Block {

        /**
         * Конструктор класса Menu
         */
        constructor(options = {
            data: {}
        }) {
            super('div');
            this.template = window.fest['menu/menu.tmpl'];
            this.data = options.data;
            this._el = options.el || document.createElement('div');
            this.render();
        }

        /**
         * Обновляем HTML
         */
        render() {
            this._updateHtml();
            this._installItems();
        }

        /**
         * Обновить html компонента
         */
        _updateHtml() {
            this._el.innerHTML = this.template(this.data);
        }

        _installItems() {
            let {
                items = []
            } = this.data;

            items.forEach(data => {
                let item = new LinkButton(data);
                this._el.querySelector('.js-menu').appendChild(item._get());
            });
        }
    }

    // export
    window.Menu = Menu;
})();
