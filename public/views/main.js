(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const Menu = window.Menu;
    const Router = window.Router;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-main');
            this.hide();
        }

        init(options = {}) {
            let data_items = null;
            if (currentUser.is_authenticated()) {
                data_items = [{
                    text: 'User list',
                    url: '/users',
                    classes: ['button_full-width']
                }, {
                    text: 'Chat',
                    url: '/chat',
                    classes: ['button_full-width']
                }];
            } else {
                data_items = [{
                    text: 'Sign Up',
                    url: '/signup',
                    classes: ['button_full-width']
                }, {
                    text: 'Login',
                    url: '/login',
                    classes: ['button_full-width']
                }];
            }

            this._component = new Menu({
                el: this._el,
                data: {
                    title: 'Fantasy Battle',
                    items: data_items
                }
            });
        }

        resume(options = {}) {
            this._component.render();
            this.show();
        }

        get title() {
            return 'Fantasy Battle';
        }
    }

    // export
    window.MainView = MainView;

})();
