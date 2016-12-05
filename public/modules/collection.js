(function () {
    'use strict';

    // import
    const request = window.request;
    const Model = window.Model;

    class Collection {

        constructor(model, data = []) {
            this.model = model;
            this.data = [];
            this.setData(data);
        }

        get objects() {
            return this.data;
        }

        setData(data = []) {
            data = data.map(item => {
                return new this.model(item);
            });

            data.forEach(item => {
                this.data.push(item);
            })
            return this;
        }

        loadData(params = {}) {
            return request('GET', (new this.model).url, params)
                .then(data => {
                    this.setData(data['users']);
                });
        }

    }

    // export
    window.Collection = Collection;

})();
