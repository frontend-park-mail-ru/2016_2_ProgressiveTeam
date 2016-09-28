function openRestPage(title, url, params={}) {
    document.title = title;
    history.pushState(params, title, url);
}
