(function () {
    'use strict';

    const Router = window.Router;
    const GameView = window.GameView;
    const MainView = window.MainView;
    const LoginView = window.LoginView;
    const LogoutView = window.LogoutView;
    const SignupView = window.SignupView;
    const UserListView = window.UserListView;

    (new Router)
        .addRoute('/game', ChatView)
        .addRoute('/signup', SignupView)
        .addRoute('/logout', LogoutView)
        .addRoute('/login', LoginView)
        .addRoute('/users', UserListView)
        .addRoute('/', MainView)
        .start();

})();
