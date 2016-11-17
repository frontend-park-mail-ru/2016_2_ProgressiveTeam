(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const Menu = window.Menu;
    const Container = window.Container;
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

            let menu = new Menu({
                el: document.createElement('div'),
                data: {
                    title: 'Fantasy Battle',
                    items: data_items
                }
            });
            menu.render();

            this._component = new Container({
                el: this._el,
                classes: ['container_small ', 'container_no-background', 'container_center']
            });
            this._component.append(menu);
        }

        resume(options = {}) {
            this.init();
            this.show();
            this._component.render();
        }

        get title() {
            return 'Fantasy Battle';
        }
    }

    // export
    window.MainView = MainView;

})();
