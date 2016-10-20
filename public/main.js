(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const MainView = window.MainView;

	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/', MainView)
		.start();

})();
