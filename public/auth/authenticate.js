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
                        localStorage.setItem('user_data', JSON.stringify({
                            'id': this.id,
                            'login': this.login,
                            'email': this.email
                        }));
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
                        localStorage.removeItem('user_data');
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
                }
            });
        }

        /**
         * Ask server for current user
         * @returns {User}
         */
        static getCurrentUser() {
            let local_data = localStorage.user_data;
            if (local_data) {
                return new CurrentUser(JSON.parse(local_data), true);
            }
            let data = request('GET', '/session', {}, false);
            if (!data.error) {
                localStorage.setItem('user_data', JSON.stringify(data));
                return new CurrentUser(data, true);
            } else {
                return new CurrentUser();
            }
        }
    }

    // export
    window.currentUser = CurrentUser.getCurrentUser();

})();
