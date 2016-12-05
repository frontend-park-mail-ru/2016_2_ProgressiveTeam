(function () {
    'use strict';

    const currentUser = window.currentUser;

    const request = window.request;
    const View = window.View;
    const Container = window.Container;
    const FormFactory = window.FormFactory;
    const Router = window.Router;

    class SignupView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-signup');
            this.hide();
        }

        init(options = {}) {
            let form = FormFactory.createSignupForm(document.createElement('div'));

            this._component = new Container({
                el: this._el,
                classes: ['container_small ', 'container_center']
            });
            this._component.append(form);

            form.on('submit', event => {
                event.preventDefault();
                if (form.isValid()) {
                    let data = form.getFormData()
                    currentUser.attributes = {
                        login: data.login,
                        email: data.email,
                        password: data.password
                    };
                    currentUser.register();
                }
            });
            form.render();
        }

        resume(options = {}) {
            if (currentUser.is_authenticated()) {
                (new Router).go('/');
                return;
            }

            this.show();
            this._component.render();
        }

        get title() {
            return 'Signup';
        }
    }

    // export
    window.SignupView = SignupView;

})();
