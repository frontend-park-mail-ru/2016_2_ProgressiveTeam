(function () {
	'use strict';

	if (typeof window === 'object') {

		//import
		let Button = window.Button;
		let Chat = window.Chat;
		let Form = window.Form;

		let loginPage = document.querySelector('.js-login');
		let signupPage = document.querySelector('.js-signup');
		let chatPage = document.querySelector('.js-chat');

		let loginForm = new Form({
			el: document.createElement('div'),
			data: {
				title: 'Login',
				fields: [
					{
						label: 'Login',
						attrs: {
							name: 'user',
							type: 'text',
						}
					},
					{
						label: 'Password',
						attrs: {
							name: 'password',
							type: 'password',
						}
					}
				],
				controls: [
					{
						text: 'sign up',
						on: {
							type: 'click',
							callback: event => {
								event.preventDefault();

								loginPage.hidden = true;
								signupPage.hidden = false;
							},
						}
					},
					{
						text: 'login',
						attrs: {
							type: 'submit',
						},
						classes: [
							'button-primary',
						]
					}
				]
			}
		});

		let chat = new Chat({
			el: document.createElement('div'),
		});

		loginForm.on('submit', event => {
			event.preventDefault();

			let formData = loginForm.getFormData();
			technolibs.request('/api/login', formData);

			chat.set({
				username: formData.user,
				password: formData.password
			})
			.render();

			chat.subscribe();

			loginPage.hidden = true;
			chatPage.hidden = false;
		});

		let signupForm = new Form({
			el: document.createElement('div'),
			data: {
				title: 'Sign up',
				fields: [
					{
						label: 'Login',
						attrs: {
							name: 'user',
							type: 'text',
						}
					},
					{
						label: 'Email',
						attrs: {
							name: 'email',
							type: 'email',
						}
					},
					{
						label: 'Password',
						attrs: {
							name: 'password',
							type: 'password',
						}
					}
				],
				controls: [
					{
						text: 'back',
						on: {
							type: 'click',
							callback: event => {
								event.preventDefault();

								signupPage.hidden = true;
								loginPage.hidden = false;
							},
						}
					},
					{
						text: 'sign up',
						attrs: {
							type: 'submit',
						},
						classes: [
							'button-primary',
						]
					}
				]
			}
		});

		signupForm.on('submit', event => {
			event.preventDefault();

			let formData = signupForm.getFormData();
			technolibs.request('/api/signup', formData);

			chat.set({
				username: formData.user,
				email: formData.email
			})
			.render();

			chat.subscribe();

			signupPage.hidden = true;
			chatPage.hidden = false;
		});

		loginPage.appendChild(loginForm.el);
		signupPage.appendChild(signupForm.el);
		chatPage.appendChild(chat.el);

		loginPage.hidden = false;
	}

})();
