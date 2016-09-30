(function() {
    'use strict';

    class Button {
        constructor(options) {
            this.text = options.text;
            this.attrs = options.attrs || [];
            this.classes = options.classes || [];
            this.eventData = options.on;
            this.el = document.createElement('button');
        }

        setClasses(classes) {
            classes.forEach(className => {
                this.el.classList.add(className);
            });
        }

        setAttrs(attrs) {
            Object.keys(attrs).forEach(name => {
                this.el.setAttribute(name, attrs[name]);
            });
        }

        render() {
            this.el.innerHTML = this.text;
            this.el.classList.add('button');
            this.setClasses(this.classes);
            this.setAttrs(this.attrs);
            if (this.eventData) {
                this.on(this.eventData.type, this.eventData.callback);
            }
            return this;
        }

        on(type, callback) {
            this.el.addEventListener(type, callback);
        }

        toString() {
            return this.el.outerHTML;
        }
    }

    // export
    window.Button = Button;
})();
