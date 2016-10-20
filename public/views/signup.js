(function () {
    'use strict';

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
            this._component.render();
            this.show();
        }
    }

    // export
    window.SignupView = SignupView;

})();
