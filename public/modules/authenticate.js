(function (){
    'use strict';

    // import
    const User = window.User;

    class CurrentUser extends User {

        is_authenticated() {
            return this.name !== '';
        }

        /**
         * Ask server for current user
         * @returns {User}
         */
        static getCurrentUser() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/session', false);
            xhr.setRequestHeader('CORS', 'Access-Control-Allow-Origin');
            xhr.send();

            try {
                return new CurrentUser(JSON.parse(xhr.responseText));
            } catch (e) {
                return new CurrentUser();
            }
        }
    }

    // export
    window.currentUser = CurrentUser.getCurrentUser();

})();
