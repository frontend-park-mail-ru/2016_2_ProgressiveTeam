(function () {
    'use strict';

    const Router = window.Router;
    const ChatView = window.ChatView;
    const MainView = window.MainView;
    const LoginView = window.LoginView;
    const SignupView = window.SignupView;
    const UserListView = window.UserListView;

    (new Router)
        .addRoute('/chat', ChatView)
        .addRoute('/signup', SignupView)
        .addRoute('/login', LoginView)
        .addRoute('/users', UserListView)
        .addRoute('/', MainView)
        .start();

})();
