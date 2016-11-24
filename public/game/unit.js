(function () {
    'use strict';

    const AnimatedObject = window.AnimatedObject;
    const cellSize = window.cellSize;
    const currentUser = window.currentUser;


    class Unit extends AnimatedObject {
        constructor({ id = -1, x = -1, y = -1, radius = 1, health = 0 }) {
            super(x, y);

            this.id = id;
            this.x = x;
            this.y = y;

            this.health = health;
        }

        draw(ctx) {
            ctx.beginPath();
            if (this.active) {
                ctx.fillStyle = '#ffed6a';
                ctx.arc(this.rawX + (cellSize / 2), this.rawY + (cellSize / 2), 40, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#333';
            ctx.arc(this.rawX + (cellSize / 2), this.rawY + (cellSize / 2), 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        setAction(action) {
            switch (action.type) {
                case 'move':
                    let properties = {};

                    if (action.coords.x > this.x) {
                        properties['rawX'] = 200;
                    } else if (action.coords.x < this.x) {
                        properties['rawX'] = -200;
                    }

                    if (action.coords.y > this.y) {
                        properties['rawY'] = 200;
                    } else if (action.coords.y < this.y) {
                        properties['rawY'] = -200;
                    }
                    let animation = new Animation('move', properties, action.coords);
                    this.runAnimation(animation);

                    break;
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
    }

    // export
    window.Unit = Unit;

})();
