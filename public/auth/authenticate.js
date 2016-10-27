(function (){
    'use strict';

    // import
    const User = window.User;
    const getCookie = window.getCookie;
    const request = window.request;

    class CurrentUser extends User {

        is_authenticated() {
            // return Boolean(getCookie('JSESSIONID'));
            return this.name !== '';
        }

        /**
         * Ask server for current user
         * @returns {User}
         */
        static getCurrentUser() {
            let data = request('GET', '/session', {}, false);

            try {
                return new CurrentUser(data);
            } catch (e) {
                return new CurrentUser();
            }
        }
    }

    // export
    window.currentUser = CurrentUser.getCurrentUser();

})();
