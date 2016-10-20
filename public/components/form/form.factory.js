(function () {
    'use strict';

    const Form = window.Form;

    class FormFactory {

        static createLoginForm(el) {
            return new Form({
                el: el,
                data: {
                    title: 'Login',
                    fields: [{
                        label: 'Login',
                        name: 'login',
                        type: 'text',
                        validate: function (val) {
                            if (typeof val === 'undefined' || val === '') {
                                return 'Login is required';
                            }
                        }
                    }, {
                        label: 'Password',
                        name: 'password',
                        type: 'password',
                        validate: function (val) {
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
                        classes: [
                            'button-left'
                        ],
                        on: [{
                            type: 'click',
                            callback: event => {
                                event.preventDefault();
                                (new Router).go('/signup');
                            }
                        }]
                    }]
                }
            });
        }

        static createSignupForm(el) {
            return new Form({
                el: el,
                data: {
                    title: 'Sign up',
                    fields: [{
                        label: 'Login',
                        name: 'login',
                        type: 'text',
                        validate: function (val) {
                            if (typeof val === 'undefined' || val === '') {
                                return 'Login is required';
                            }
                        }
                    }, {
                        label: 'Email',
                        name: 'email',
                        type: 'text',
                        validate: function (val) {
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
                        name: 'password',
                        type: 'password',
                        validate: function (val) {
                            if (typeof val === 'undefined' || val === '') {
                                return 'Password is required';
                            }
                        }
                    }],
                    controls: [{
                        text: 'Sign up',
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
                        on: [{
                            type: 'click',
                            callback: event => {
                                event.preventDefault();
                                (new Router).go('/');
                            }
                        }]
                    }]
                }
            });
        }
    }

    // export
    window.FormFactory = FormFactory;

})();
