(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const FormFactory = window.FormFactory;
    const Router = window.Router;

    class SignupView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-signup');
            this.hide();
        }

        init(options = {}) {
            this._component = FormFactory.createSignupForm(this._el);

            this._component.on('submit', event => {
                event.preventDefault();
            });
        }

        resume(options = {}) {
            if (currentUser.is_authenticated()) {
                (new Router).go('/');
                return;
            }

            this._component.render();
            this.show();
        }

        get title() {
            return 'Signup';
        }
    }

    // export
    window.SignupView = SignupView;

})();
