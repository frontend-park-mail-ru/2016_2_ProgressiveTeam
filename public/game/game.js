(function () {
    'use strict';

    const WSHandler = window.WSHandler;
    const TimeLine = window.TimeLine;
    const Pane = window.Pane;
    const Field = window.Field;
    const Unit = window.Unit;

    class Game {
        constructor({canvas, width, height}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = width;
            this.height = height;

            this.ws = new WSHandler();
            this.ws.newTurnFunc = this.newTurn.bind(this);

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

            this.pane = new Pane(this.field, this.timeline);

            this.initEvents();
        }

        ready() {
            this.ws.sendPosition(this.field.getPosition());

            // Show animation to wait for opponent
            this.pane.waitForOpponentReady();
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
                this.pane.startMyTurn(currentTurn);
                // TODO Move to pane.startMyTurn
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
                                action: 'attack',
                                coords: moving_to_coords,
                                coords_of_attack: coords
                            });
                        }
                    } else {
                        if (this.currentUnit.isReachable(coords)) {
                            this.ws.sendTurn({
                                action: 'move',
                                coords: moving_to_coords
                            });
                        }
                    }
                }
            });
        }

        runAction(action_data) {
            switch (action_data.action) {
                case 'move':
                    // Move currentUnit
                    this.field.animate(this.ctx, 'move', {coords: action_data.coords});
                    break;
                case 'attack':
                    // Move currentUnit and attack the unit
                    this.field.animate(this.ctx, 'move', {coords: action_data.coords});
                    this.field.animate(this.ctx, 'attack', {coords: action_data.coords_to_attack});
                    // TODO Change with new API
                    this.field.animate(this.ctx, 'hp_change', {
                        coords: action_data.coords,
                        new_unit_data: null
                    });
                    break;
            }
        }
    }

    // export
    window.Game = Game;

})();
