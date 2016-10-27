(function () {
    'use strict';

    const Block = window.Block;

    class Layout extends Block {

        constructor(options) {
            super('div', options);
            this.template = window.fest['layout/layout.tmpl'];

            this._el = options.el;
            this.orientation = 'layout__object_' + options.orientation || 'horizontal';

            this.objects = options.objects || [];

            this.render();
        }

        setObjects(objects = []) {
            objects.forEach(object => {
                this.objects.push(object);
            })
            this.render();
        }

        add(object) {
            this.objects.push(object);
            this.render();
        }

        /**
         * Обновление внешнего вида
         */
        render() {
            this._updateHtml();
        }

        /**
         * Обновляем HTML элемента
         */
        _updateHtml() {
            let layout_wrapper = document.createElement('div');
            layout_wrapper.className = 'layout';

            this.objects.forEach(obj => {
                let layout_obj = document.createElement('div');
                layout_obj.className = `layout__object ${this.orientation}`;
                layout_obj.appendChild(obj._get());

                layout_wrapper.appendChild(layout_obj);
            });

            this._el.innerHTML = '';
            this._el.append(layout_wrapper);
        }
    }

    // export
    window.Layout = Layout;

})();
