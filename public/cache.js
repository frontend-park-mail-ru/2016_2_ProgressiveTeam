const CACHE_NAME = 'app_serviceworker_v_1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',
	'/css/main.css',
    '/fonts/ENDORALT.ttf',
    '/static/background-main.jpg',

	'/libs/technolibs/index.js',

    "/modules/request.js",
    "/modules/pathToRegex.js",
    "/modules/getCookie.js",
    "/modules/view.js",
    "/modules/model.js",
    "/modules/route.js",
    "/modules/router.js",
    "/modules/collection.js",

    "/models/message.js",
    "/models/user.js",

    "/auth/authenticate.js",

    "/components/block/block.js",
    "/components/container/container.js",
    "/components/button/button.js",
    "/components/link_button/link_button.js",
    "/components/form/form.tmpl.js",
    "/components/form/form.js",
    "/components/form/form.factory.js",
    "/components/menu/menu.js",
    "/components/menu/menu.tmpl.js",
    "/components/item_list/item_list.js",
    "/components/layout/layout.js",
    "/components/user_list/user_list.js",
    "/components/user_list/user_list.tmpl.js",

    "/game/animation.js",
    "/game/animatedObject.js",
    "/game/field.js",
    "/game/unit.js",
    "/game/timeline.js",
    "/game/pane.js",
    "/game/wshandler.js",
    "/game/game.js",

    "/views/main.js",
    "/views/login.js",
    "/views/logout.js",
    "/views/signup.js",
    "/views/user_list.js",
    "/views/game.js",

	'/main.js'
];

this.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME)
			.then(function (cache) {
			// загружаем в наш cache необходимые файлы
			return cache.addAll(cacheUrls);
		})
	);
});

this.addEventListener('fetch', function (event) {
	// console.log(event);
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {

			// выдаём кэш, если он есть
			if (cachedResponse) {
				return cachedResponse;
			}

			// иначе запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
