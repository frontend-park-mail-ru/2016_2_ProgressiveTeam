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
            this._component = new Container({
                el: this._el,
                classes: ['container_small ', 'container_no-background', 'container_center']
            });
        }

        updateHTML(is_auth) {
            let data_items = null;
            if (is_auth) {
                data_items = [{
                    text: 'User list',
                    url: '/users',
                    classes: ['button_full-width']
                }, {
                    text: 'Game',
                    url: '/game',
                    classes: ['button_full-width']
                }, {
                    text: 'Logout',
                    url: '/logout',
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
            while (this._component._el.firstChild) {
                this._component._el.removeChild(this._component._el.firstChild);
            }
            this._component.append(menu);
        }

        resume(options = {}) {
            // TODO Switch buttons
            this.updateHTML(currentUser.is_authenticated());
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
