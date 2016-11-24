(function() {
    'use strict';

    // Погрешность
    const error = 2;

    let idCounter = 0;


    class Animation {
        constructor(type, properies = {}, finishState = {}, duration = 0) {
            this._id = ++idCounter;

            this.type = type;
            this.properties = properies;
            this.finishState = finishState;
            this.duration = duration;

            this.startTime = undefined;
            this.isRunning = false;
            this.isFinished = false;
        }

        run() {
            this.startTime = Date.now();
            this.run = true;

            return this;
        }

        update(obj, dt) {
            if (this.run && !this.isFinished) {
                if (this.isTimeOut || !Object.keys(this.properties).length) {
                    this.isFinished = true;
                }

                Object.keys(this.properties).forEach(prop => {
                    obj[prop] += this.properties[prop] * dt;

                    if (obj[prop] > this.finishState[prop] - error &&
                            obj[prop] < this.finishState[prop] + error) {
                        obj[prop] = this.finishState[prop];
                        delete this.properties[prop];
                    }
                });
            }
        }

        isTimeOut() {
            return Date.now() - this.startTime >= this.duration;
        }

        get id() {
            return this._id;
        }
    }


    window.Animation = Animation;

})();
