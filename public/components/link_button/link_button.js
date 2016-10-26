(function () {
	'use strict';

    const Button = window.Button;
	const Router = window.Router;

	class LinkButton extends Button {
		constructor(options) {
			super(options);
            this.setLink(options.url);
		}

        setLink(url) {
            this.on('click', event => {
                event.preventDefault();
                (new Router).go(url);
            });
        }
	}

	//export
	window.LinkButton = LinkButton;

})();
