(function() {
    'use strict';

    const Block = window.Block;

    class Notification extends Block {
        constructor(options) {
            super('div', options);
            this._el.classList.add('notification');
            this._el.innerText = this._options.text;
        }

    }

    window.notificationComponent = Notification;

})();
