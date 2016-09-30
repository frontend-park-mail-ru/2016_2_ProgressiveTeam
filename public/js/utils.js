(function() {
    'use strict';

    /**
     * Push url to history and change title
     * @param {string} title Title of a new page
     * @param {string} url New url
     * @param {dict} params Get params
     */
    function openRestPage(title, url, params = {}) {
        document.title = title;
        history.pushState(params, title, url);
    }

    window.openRestPage = openRestPage;
})();
