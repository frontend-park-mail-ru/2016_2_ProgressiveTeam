(function (){
    'use strict';

    // import
    const User = window.User;
    const getCookie = window.getCookie;
    const request = window.request;
    const Router = window.Router;

    class CurrentUser extends User {

        constructor(data, is_authenticated = false) {
            super(data);
            this.has_auth = is_authenticated;
        }

        is_authenticated() {
            return this.has_auth;
        }

        auth() {
            request('POST', '/session', {
                login: this.login,
                password: this.password
            }).then(data => {
                    console.log(data);
                    if (!data.error) {
                        this.has_auth = true;
                        (new Router).go('/');
                    }
                });
        }

        logout() {
            request('DELETE', '/session', {})
                .then(data => {
                    console.log(data);
                    if (!data.error) {
                        this.has_auth = false;
                        (new Router).go('/');
                    }
                })
        }

        register() {
            request('POST', '/user', {
                login: this.login,
                email: this.email,
                password: this.password
            }).then(data => {
                if (data === {}) {
                    this.auth();
                    (new Router).go('/');
                }
            });
        }

        /**
         * Ask server for current user
         * @returns {User}
         */
        static getCurrentUser() {
            let data = request('GET', '/session', {}, false);
            if (!data.error) {
                return new CurrentUser(data, true);
            } else {
                return new CurrentUser();
            }
        }
    }

    // export
    window.currentUser = CurrentUser.getCurrentUser();

})();
