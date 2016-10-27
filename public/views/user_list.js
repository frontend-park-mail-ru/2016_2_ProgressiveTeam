(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const User = window.User;
    const ItemList = window.ItemList;
    const LinkButton = window.LinkButton;
    const Layout = window.Layout;
    const Router = window.Router;

    class UserListView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-user-list');
            this.hide();
        }

        init(options = {}) {
            this._component = new Layout({
                el: this._el,
                orientation: 'vertical',
                objects: [
                    new ItemList({
                        el: document.createElement('div'),
                        Model: User,
                        data: {
                            title: 'Users'
                        },
                    }),
                    new LinkButton({
                        text: 'Back',
                        url: '/'
                    })
                ]
            });
        }

        resume(options = {}) {
            this._component.render();
            this.show();
        }

        get title() {
            return 'User list';
        }
    }

    // export
    window.UserListView = UserListView;

})();
