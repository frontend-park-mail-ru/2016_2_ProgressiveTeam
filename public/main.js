

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
        let ip = 'https://progressive-team-backend.herokuapp.com';

        document.getElementById('logout_btn').addEventListener('click', event => {
          let promise = fetch(ip + '/api/session', {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              mode: 'cors',
              credentials: 'include',
              cache: 'no-cache'
          }).then(response => {
              return response.json();
          }).then(data => {
              console.log(data);
              if (data.error) {
              } else {
                  loginPage.hidden = false;
                  openRestPage("login", "/");
                  chatPage.hidden = true;
                  signupPage.hidden = true;
              }
          }).catch(alert => {
              loginForm.setError('Error was occured in request');
          });
        })

        function logout() {

        }

        let user = {};

        let errors = {
            0: 'Empty fields in request',
            1: 'Auth required',
            2: 'Auth failed',
            3: 'User already exist',
            4: 'User not exist',
            5: 'Already authorized'
        }


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
                    text: 'login',
                    attrs: {
                        type: 'submit'
                    },
                    classes: [
                        'button-primary'
                    ]
                }, {
                    text: 'sign up',
                    attrs: {
                        type: 'clear'
                    },
                    classes: [
                        'button-left'
                    ],
                    on: {
                        type: 'click',
                        callback: event => {
                            event.preventDefault();

                            loginPage.hidden = true;
                            openRestPage("Sign Up", "/signup");
                            signupPage.hidden = false;
                        }
                    }
                }]
            }
        });

        let chat = new Chat({
            el: document.createElement('div')
        });

        loginForm.on('submit', event => {
            event.preventDefault();

            let formData = loginForm.getFormData();

            let promise = fetch(ip + '/api/session', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache'
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.error) {
                    loginForm.setError(errors[data.error]);
                } else {
                    user = {
                        id: data.id,
                        username: formData.user,
                        email: formData.email
                    };

                    chat.set(user)
                        .render();

                    chat.subscribe();

                    loginPage.hidden = true;
                    openRestPage("Chat", "/chat");
                    chatPage.hidden = false;
                }
            }).catch(alert => {
                loginForm.setError('Error was occured in request');
            });

            /*
            let body = response.json();

            if (response.status != 200) {
                loginForm.setError(response.statusText);
                return;
            }


            */
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
                    text: 'sign up',
                    attrs: {
                        type: 'submit'
                    },
                    classes: [
                        'button-primary'
                    ]
                }, {
                    text: 'back',
                    classes: [
                        'button-left'
                    ],
                    on: {
                        type: 'click',
                        callback: event => {
                            event.preventDefault();

                            signupPage.hidden = true;
                            openRestPage("Login", "/");
                            loginPage.hidden = false;
                        }
                    }
                }]
            }
        });

        signupForm.on('submit', event => {
            event.preventDefault();

            let formData = signupForm.getFormData();

            let promise = fetch(ip + '/api/user', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache'
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.error) {
                    signupPage.setError(errors[data.error]);
                } else {
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
                }
            }).catch(alert => {
                loginForm.setError('Error was occured in request');
            });
        });

        loginPage.appendChild(loginForm.el);
        signupPage.appendChild(signupForm.el);
        chatPage.appendChild(chat.el);

        loginPage.hidden = false;
    }
})();
