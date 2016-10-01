(function() {
    'use strict';

    if (typeof window === 'object') {
        // import
        let Chat = window.Chat;
        let Form = window.Form;
        let openRestPage = window.openRestPage;

        let loginPage = document.querySelector('.js-login');
        let signupPage = document.querySelector('.js-signup');
        let chatPage = document.querySelector('.js-chat');

        let ip = 'http://172.16.49.182:8080';

        let user = {};

        let loginForm = new Form({
            el: document.createElement('div'),
            data: {
                title: 'Login',
                fields: [{
                    label: 'Login',
                    attrs: {
                        name: 'login',
                        type: 'text'
                    },
                    validate: function(val) {
                        if (typeof val === 'undefined' || val === '') {
                            return 'Login is required';
                        }
                    }
                }, {
                    label: 'Password',
                    attrs: {
                        name: 'password',
                        type: 'password'
                    },
                    validate: function(val) {
                        if (typeof val === 'undefined' || val === '') {
                            return 'Password is required';
                        }
                    }
                }],
                controls: [{
                    text: 'sign up',
                    attrs: {
                        type: 'clear'
                    },
                    on: {
                        type: 'click',
                        callback: event => {
                            event.preventDefault();

                            loginPage.hidden = true;
                            openRestPage("Sign Up", "/signup");
                            signupPage.hidden = false;
                        }
                    }
                }, {
                    text: 'login',
                    attrs: {
                        type: 'submit'
                    },
                    classes: [
                        'button-primary'
                    ]
                }]
            }
        });

        let chat = new Chat({
            el: document.createElement('div')
        });

        loginForm.on('submit', event => {
            event.preventDefault();

            let formData = loginForm.getFormData();
            let response = technolibs.request(ip + '/api/session', formData);

            console.log(response);
            response = JSON.parse(response);

            if (response.error) {
                console.log(response);
                loginForm.setError(response.error);
                return;
            }

            user = {
                id: response.id,
                username: formData.user,
                email: formData.email
            };

            chat.set(user)
                .render();

            chat.subscribe();

            loginPage.hidden = true;
            openRestPage("Chat", "/chat");
            chatPage.hidden = false;
        });

        let signupForm = new Form({
            el: document.createElement('div'),
            data: {
                title: 'Sign up',
                fields: [{
                    label: 'Login',
                    attrs: {
                        name: 'login',
                        type: 'text'
                    },
                    validate: function(val) {
                        if (typeof val === 'undefined' || val === '') {
                            return 'Login is required';
                        }
                    }
                }, {
                    label: 'Email',
                    attrs: {
                        name: 'email',
                        type: 'text'
                    },
                    validate: function(val) {
                        if (typeof val === 'undefined' || val === '') {
                            return 'Email is required';
                        }

                        /*eslint-disable*/
                        let EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        /*eslint-enable*/

                        if (!EMAIL_RE.test(val)) {
                            return 'Enter correct email';
                        }
                    }
                }, {
                    label: 'Password',
                    attrs: {
                        name: 'password',
                        type: 'password'
                    },
                    validate: function(val) {
                        if (typeof val === 'undefined' || val === '') {
                            return 'Password is required';
                        }
                    }
                }],
                controls: [{
                    text: 'back',
                    on: {
                        type: 'click',
                        callback: event => {
                            event.preventDefault();

                            signupPage.hidden = true;
                            openRestPage("Login", "/");
                            loginPage.hidden = false;
                        }
                    }
                }, {
                    text: 'sign up',
                    attrs: {
                        type: 'submit'
                    },
                    classes: [
                        'button-primary'
                    ]
                }]
            }
        });

        signupForm.on('submit', event => {
            event.preventDefault();

            let formData = signupForm.getFormData();
            let response = technolibs.request(ip + '/api/user', formData);

            if (typeof response.error !== 'undefined') {
                console.log(response);
                signupForm.setError(response.error);
                return;
            }

            user = {
                id: response.id,
                username: formData.user,
                email: formData.email
            };

            chat.set(user)
                .render();

            chat.subscribe();

            signupPage.hidden = true;
            openRestPage("Chat", "/chat");
            chatPage.hidden = false;
        });

        loginPage.appendChild(loginForm.el);
        signupPage.appendChild(signupForm.el);
        chatPage.appendChild(chat.el);

        loginPage.hidden = false;
    }
})();
