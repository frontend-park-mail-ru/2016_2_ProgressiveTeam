(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const FormFactory = window.FormFactory;
    const Router = window.Router;

    class LoginView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-login');
            this.hide();
        }

        init(options = {}) {
            this._component = FormFactory.createLoginForm(this._el);

            this._component.on('submit', event => {
                event.preventDefault();
            });
        }

        resume(options = {}) {
            this._component.render();
            this.show();
        }

        get title() {
            return 'Login';
        }
    }

    // export
    window.LoginView = LoginView;

})();
