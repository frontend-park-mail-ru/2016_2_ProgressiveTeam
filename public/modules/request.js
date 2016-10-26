(function () {
    'use strict';

    // let ip = 'https://progressive-team-backend.herokuapp.com';
    let ip = '';

    /**
     * function for ajax requests to hardcoded address.
     * @returns {JSON} response data
     */
    function request(method, url, data, is_async = true) {

        let xhr = new XMLHttpRequest();
        xhr.open(method, ip + url, is_async);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-type', 'application/json');

        if (is_async) {
            return _async_request();
        } else {
            return _sync_request();
        }

        /**
         * function for ajax request.
         * @returns {Promise} JSON data
         */
        function _async_request() {
            return new Promise((resolve, reject) => {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        } else {
                            reject();
                        }
                    }
                }

                xhr.send(JSON.stringify(data));
            }).then(response => {
                return JSON.loads(response);
            });
        }

        /**
         * function for sync request
         * @returns {JSON}
         */
        function _sync_request() {
            xhr.send(JSON.stringify(data));

            try {
                return JSON.parse(xhr.responseText);
            } catch (e) {
                return {};
            }
        }
    }

    // export
    window.request = request;

})();
