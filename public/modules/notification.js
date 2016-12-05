(function() {

    class Notification {
        constructor(options) {
            const notify = window.notificationComponent;

            if (notificationComponent) {
                this.notify = new notify(options);
            } else {
                console.log(options.text);
            }
        }

        getDomElement() {
            if (this.notify) {
                return this.notify._el;
            }
        }
    }

    window.notificationComponent = undefined;
    window.Notification = Notification;

})();
