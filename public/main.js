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

    let user = {};

    let loginForm = new Form({
      el: document.createElement('div'),
      data: {
        title: 'Login',
        fields: [{
          label: 'Login',
          attrs: {
            name: 'user',
            type: 'text'
          }
        }, {
          label: 'Password',
          attrs: {
            name: 'password',
            type: 'password'
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
      let response = technolibs.request('/api/session', formData);

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
            name: 'user',
            type: 'text'
          }
        }, {
          label: 'Email',
          attrs: {
            name: 'email',
            type: 'email'
          }
        }, {
          label: 'Password',
          attrs: {
            name: 'password',
            type: 'password'
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
      let response = technolibs.request('/api/user', formData);

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
