(function() {
  'use strict';

  /**
  * Push url to history and change title
  */
  function openRestPage(title, url, params = {}) {
    document.title = title;
    history.pushState(params, title, url);
  }

  window.openRestPage = openRestPage;
});
