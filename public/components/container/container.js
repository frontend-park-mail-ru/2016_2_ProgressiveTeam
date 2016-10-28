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

            if (this.options.classes.indexOf('container_center') !== -1) {
                this._moveToCenter();
            }
        }

        /**
         * Перемещает блок в центр окна
         */
        _moveToCenter() {
            let style = window.getComputedStyle(this._el, null);
            console.log(style.height, style.width);
            this._el.style.marginTop = parseInt(`-${parseInt(style.height.slice(0, -2), 10) / 2}`, 10) + 'px';
            this._el.style.marginLeft = parseInt(`-${parseInt(style.width.slice(0, -2), 10) / 2}`, 10) + 'px';
            this.on('load', event => {
            });
        }
    }

    // export
    window.Container = Container;

})();
