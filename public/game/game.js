(function () {
    'use strict';

    const WSHandler = window.WSHandler;
    const TimeLine = window.TimeLine;
    const Field = window.Field;
    const Unit = window.Unit;

    class Game {
        constructor({canvas, width, height}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = width;
            this.height = height;

            this.ws = new WSHandler();

            this.timeline = new TimeLine();
            this.field = new Field({
                x: 0,
                y: 0,
                count_x: 10,
                count_y: 6
            });
            this.field.addUnits([
                new Unit({ x: 1, y: 1 }),
                new Unit({ x: 3, y: 4 }),
            ])

            this.initEvents();
        }

        ready() {
            this.ws.sendPosition(this.field.getPosition());
            // Show animation to wait for opponent
        }

        /**
         * New turn
         *
         * need to check whose turn now
         */
        newTurn(data) {
            this.timeline.push(data.timeline);
            let currentTurn = this.timeline.pop();

            this.runAction(data.action);

            if (currentTurn.isMine() && currentTurn.id === data.id) {
                this.field.setActiveUnit(currentTurn.unit_id);
            }
        }

        initEvents() {
            this.canvas.addEventListener('mousedown', event => {
                let coords = {
                    x: event.x,
                    y: event.y
                };

                if (event.x < this.field._width && event.y < this.field._height) {
                    let unit = this.field.clicked(event);
                    if (unit && unit.isEnemy()) {
                        // currentUnit is going to attack unit
                        let moving_to_coords = this.field.getCellToMove();
                        if (this.currentUnit.isReachable(coords) &&
                                this.currentUnit.isReachable(moving_to_coords)) {
                            this.ws.sendTurn({

                            });
                        }
                    } else {
                        if (this.currentUnit.isReachable(coords)) {
                        }
                    }
                }
            });

            this.ws.newData = data => {

            }
        }

        runAction(action_data) {
            // Move currentUnit and attack the unit
            this.ws.attack(moving_to_coords, coords);

            this.currentUnit.animate(ctx, 'move', {
                coords: moving_to_coords
            });
            this.currentUnit.animate(ctx, 'attack', {coords});

            // Move currentUnit
            this.ws.move(coords);

            this.currentUnit.animate(ctx, 'move', {coords});
        }
    }

    // export
    window.Game = Game;

})();
