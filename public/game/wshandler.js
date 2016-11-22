(function() {
    'use strict';

    class WSHandler {
       
        constructor(message_func, address = 'wss://progressive-team-backend.herokuapp.com/game') {
            this.ws = new WebSocket(address);
            this.ws.onopen = this.open;
            this.ws.onclose = this.close;
            this.ws.onerror = this.error;
            this.ws.onmessage = message_func || this.message;
        }

        open() {
            console.log('Socket is opened');
        }

        close(event) {
            console.log(event);
            console.log('Socket is closed');
        }

        error(error) {
            console.log(event);
        }

        message(event) {
            console.log(event);
        }

        sendData(data) {
            console.log(event);
        }
    }

    // export
    window.WSHandler = WSHandler;

})();
