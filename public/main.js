(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const MainView = window.MainView;
	const SignupView = window.SignupView;

	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/signup', SignupView)
		.addRoute('/', MainView)
		.start();

})();
