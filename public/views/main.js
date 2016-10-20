(function () {
    'use strict';

    const View = window.View;
    const Form = window.Form;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-login');
            this.hide();
        }

        init(options = {}) {

            this._component = new Form({
                el: this._el,
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
                        }
                    ],
                    controls: [{
                        text: 'login',
                        attrs: {
                            type: 'submit'
                        },
                        classes: [
                            'button-primary'
                        ]
                    },{
                        text: 'sign up',
                        classes: [
                            'button-left'
                        ],
                        on: [{
                            type: 'click',
                            callback: event => {
                                event.preventDefault();
                                
                            }
                        }]
                    }]
                }
            });

            this._component.on('submit', event => {
                event.preventDefault();
            });
        }

        resume(options = {}) {
            this._component.render();
            this.show();
        }
    }

    // export
    window.MainView = MainView;

})();
