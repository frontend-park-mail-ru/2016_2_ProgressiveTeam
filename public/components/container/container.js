(function () {
    'use strict';

    const Block = window.Block;

    class Container extends Block {

        constructor(options = {}) {
            if (options.classes) {
                options.classes.push('container');
            } else {
                options['classes'] = ['container'];
            }
            super('div', options);

            this.options = options;
        }

        render() {
            if (this.options.el) {
                this.renderTo(this.options.el);
            }

            if (this.options.classes.indexOf('container_center')) {
                this._moveToCenter();
            }
        }

        /**
         * Перемещает блок в центр окна
         */
        _moveToCenter() {
            this._el.style.margin = parseInt(`-${this._el.style.height / 2}`, 10);
        }
    }

    // export
    window.Container = Container;

})();
