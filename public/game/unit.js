(function () {
    'use strict';

    const currentUser = window.currentUser;
    const fieldElemWidth = window.fieldElemWidth;


    class Unit {
        constructor({ id = -1, x = -1, y = -1, radius = 1, health = 0 }) {
            this.id = id;
            this.x = x;
            this.y = y;

            this.rawX = this.x * fieldElemWidth;
            this.rawY = this.y * fieldElemWidth;
            this.vy = 5;
            this.vx = 5;

            this.health = health;
        }

        draw(ctx) {
            ctx.beginPath();
            if (this.highColor) {
                ctx.fillStyle = '#ffed6a';
                ctx.arc(rawX + (fieldElemWidth / 2), rawY + (fieldElemWidth / 2), 40, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#333';
            ctx.arc(rawX + (fieldElemWidth / 2), rawY + (fieldElemWidth / 2), 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        setAction(action_data) {
            console.log(action_data);
            this.actionSteps = [];

            switch (action_data.type) {
                case 'move':
                    // Move currentUnit
                    this.actionSteps.push({
                        type: 'move',
                        coords: action_data.coords
                    });
                    break;
                case 'attack':
                    this.actionSteps.push({
                        type: 'hp_change',
                        value: action_data.value
                    });
                    this.actionSteps.push({
                        type: 'attack',
                        coords: action_data.action_to
                    });
                    this.actionSteps.push({
                        type: 'move',
                        coords: action_data.coords
                    });
                    break;
            }
        }

        update(dt) {
            if (!this.currentAction && this.actionSteps) {
                this.currentAction = this.actionSteps.pop();
            }

            if (this.currentAction) {
                switch (this.currentAction.type) {
                    case 'move':
                        if (this.currentAction.coords.x * fieldElemWidth >= this.rawX &&
                                this.currentAction.coords.y * fieldElemWidth == this.rawY) {
                            this.currentAction = undefined;
                            break;
                        }
                        this.vx = (this.x > this.currentAction.coords.x ?
                            Math.abs(this.vx) : -Math.abs(this.vx));
                        this.vy = (this.y > this.currentAction.coords.y ?
                            Math.abs(this.vy) : -Math.abs(this.vy));

                        this.vy = 0;
                        this.x += this.vx * dt;
                        this.y += this.vy * dt;
                        break;
                }

            }
        }

        isReachable(event) {
            return true;
        }

        isActionReachable(event, action = 'attack') {

        }

        isEnemy() {
            return currentUser.id != this.user_id;
        }

        can_move(x, y) {
            return abs(x - this.x) + abs(y - this.y) < this.radius;
        }

        moveTo(x, y) {
            this._animateMovement(x, y);
            this.x = x;
            this.y = y;
        }

        _animateMovement(x, y) {
            draw();
        }
    }

    // export
    window.Unit = Unit;

})();
