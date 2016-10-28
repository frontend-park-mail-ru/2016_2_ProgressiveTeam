(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const UserList = window.UserList;
    const Router = window.Router;

    class UserListView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-user-list');
            this.hide();
        }

        init(options = {}) {
            this._component = new UserList({
                el: this._el
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
