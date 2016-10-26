(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const FormFactory = window.FormFactory;
    const Router = window.Router;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-main');
            this.hide();
        }

        init(options = {}) {
            this._component = FormFactory.createLoginForm(this._el);

            this._component.on('submit', event => {
                event.preventDefault();
            });
        }

        resume(options = {}) {
            if (!currentUser.is_authenticated()) {
                (new Router).go('/login');
            }

            this._component.render();
            this.show();
        }
    }

    // export
    window.MainView = MainView;

})();
