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
            this._component = new Menu({
                el: this._el,
                data: {
                    title: 'Main menu',
                    items: [{
                        text: 'Login',
                        url: '/login',
                        classes: ['button_full-width']
                    }, {
                        text: 'Chat',
                        url: '/chat',
                        classes: ['button_full-width']
                    }]
                }
            });
        }

        resume(options = {}) {
            if (!currentUser.is_authenticated()) {
                (new Router).go('/login');
            }

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
