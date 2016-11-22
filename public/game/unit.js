(function () {
    'use strict';

    const currentUser = window.currentUser;
    const fieldElemWidth = window.fieldElemWidth;


    class Unit {
        constructor({
            x = -1,
            y = -1,
            radius = 1,
            health = 0
        }) {
            this.x = x;
            this.y = y;
            this.health = health;
        }

        draw(ctx) {
            ctx.beginPath();
            let x = this.x * fieldElemWidth;
            let y = this.y * fieldElemWidth;
            if (this.highColor) {
                ctx.fillStyle = '#ffed6a';
                ctx.arc(x + (fieldElemWidth / 2), y + (fieldElemWidth / 2), 40, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#333';
            ctx.arc(x + (fieldElemWidth / 2), y + (fieldElemWidth / 2), 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        isReachable(event) {

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
