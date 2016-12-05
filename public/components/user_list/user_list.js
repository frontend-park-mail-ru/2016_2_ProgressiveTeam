(function () {
    'use strict';

    // import
    const Block = window.Block;
    const User = window.User;
    const ItemList = window.ItemList;
    const LinkButton = window.LinkButton;
    const Container = window.Container;

    class UserList extends Block {

        constructor(options = {}) {
            super('div');
            this._el = options.el;

            this.init();
        }

        init() {
            this.container = new Container({
                classes: ['container_middle']
            });
            this.item_list = new ItemList({
                el: document.createElement('div'),
                Model: User,
                template: window.fest['user_list/user_list.tmpl'],
                data: {
                    title: 'Users'
                },
            });
            this.button_back = new LinkButton({
                text: 'Back',
                url: '/'
            });

            this.layout = new Layout({
                orientation: 'vertical',
                objects: [
                    this.item_list,
                    this.button_back
                ]
            });
        }

        render() {
            this._updateHtml();
        }

        _updateHtml() {
            this.container.append(this.layout);
            this.container.renderTo(this._el);
        }
    }

    //export
    window.UserList = UserList;
})();
