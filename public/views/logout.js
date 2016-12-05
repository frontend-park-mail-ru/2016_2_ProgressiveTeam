(function () {
    'use strict';

    const currentUser = window.currentUser;

    const View = window.View;
    const FormFactory = window.FormFactory;
    const Container = window.Container;
    const Router = window.Router;

    class LogoutView extends View {
        constructor(options = {}) {
            super(options);
        }

        resume(options = {}) {
            if (!currentUser.is_authenticated()) {
                return (new Router).go('/');
            }

            currentUser.logout();
        }
    }

    // export
    window.LogoutView = LogoutView;

})();
