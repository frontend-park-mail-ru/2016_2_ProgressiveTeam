(function () {
    'use strict';

    const Router = window.Router;
    const ChatView = window.ChatView;
    const MainView = window.MainView;
    const LoginView = window.LoginView;
    const SignupView = window.SignupView;

    (new Router)
        .addRoute('/chat', ChatView)
        .addRoute('/signup', SignupView)
        .addRoute('/login', LoginView)
        .addRoute('/', MainView)
        .start();

})();
