(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const FormFactory = window.FormFactory;
    const Container = window.Container;
    const Router = window.Router;

    class LoginView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-login');
            this.hide();
        }

        init(options = {}) {
            let form = FormFactory.createLoginForm(document.createElement('div'));

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
                        password: data.password
                    };
                    currentUser.auth();
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
            return 'Login';
        }
    }

    // export
    window.LoginView = LoginView;

})();
