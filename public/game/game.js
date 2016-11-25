(function () {
    'use strict';

    const WSHandler = window.WSHandler;
    const Animation = window.Animation;
    const TimeLine = window.TimeLine;
    const Pane = window.Pane;
    const Unit = window.Unit;
    const Field = window.Field;
    const cellSize = window.cellSize;

    class Game {
        constructor({canvas, width, height}, debug = true, test = true) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = width;
            this.height = height;

            this.test = test;
            this.debug = debug;
            if (!debug) {
                this.ws = new WSHandler(this.newTurn.bind(this));
            }

            this.timeline = new TimeLine();
            this.field = new Field({
                x: 0,
                y: 0,
                count_x: 10,
                count_y: 6
            });
            if (debug) {
                this.field.addUnits([
                    new Unit({ id: 1, x: 1, y: 1 }),
                    new Unit({ id: 2, x: 3, y: 4 }),
                ]);
                this.field.setActiveUnit(1);
            }

            this.pane = new Pane(this.field, this.timeline);

            this.initEvents();
        }

        start() {
            this.active = true;
            this.ready = false;

            if (this.debug) {
                this.ready = true;

                let unit = this.field.clicked({ x: 1, y: 1 });

                unit.runAnimation(new Animation('move', {
                    rawX: 200
                }, {
                    x: 2
                }));
            }

            this.renderLoop();
        }

        clientReady() {
            this.ws.sendData(this.field.getPosition());
            this.field.clearMap();
            console.log('Waiting for opponent');

            // Show animation to wait for opponent
            // this.pane.toggleWaitOpponentAnim();
        }

        /**
         * New turn
         */
        newTurn(data) {
            console.log('New turn');
            console.log(data);
            this.pane.toggleWaitOpponentAnim();

            this.timeline.update(data.timeline);
            this.currentTurn = this.timeline.pop();

            if (!this.debug) {
                this.field.updateUnits(data.units);

                this.field.setActiveUnit(this.currentTurn.unit_id);
            }

            this.runAction(data.action);
        }

        animationFinished() {
            if (currentTurn.isMine() && currentTurn.id === data.id) {
                this.pane.startMyTurn(currentTurn);
            }
        }

        initEvents() {
            this.canvas.addEventListener('mousedown', event => {
                let coords = {
                    x: (event.x / cellSize ^ 0) - 1,
                    y: (event.y / cellSize ^ 0) - 1
                };
                console.log(coords);

                if (event.x < this.field._width + cellSize && event.y < this.field._height + cellSize) {
                    let unit = this.field.clicked(coords);
                    let activeUnit = this.field.getActiveUnit();

                    if (!this.ready) {
                        if (!unit) {
                            this.field.addUnits([
                                new Unit({ x: coords.x, y: coords.y }),
                            ]);
                        }
                        return;
                    }


                    if (unit && unit.isEnemy()) {
                        // currentUnit is going to attack unit
                        let moving_to_coords = this.field.getCellToMove(event);

                        if (activeUnit.isReachable(coords) &&
                                this.activeUnit.isReachable(moving_to_coords)) {
                            this.ws.sendTurn({
                                action: 'attack',
                                coords: moving_to_coords,
                                action_to: coords
                            });
                        }
                    } else {
                        if (activeUnit.isReachable(coords)) {
                            if (!this.debug) {
                                this.ws.sendTurn({
                                    action: 'move',
                                    coords
                                });
                            } else {
                                let data = {
                                    'action': {
                                        type: 'move',
                                        coords: {x: coords.x, y: coords.y}
                                    }
                                };
                                this.newTurn(data);
                            }
                        }
                    }
                }
            });

            document.addEventListener('keydown', (type, event) => {
                if (type.key == 'Enter') {
                    this.ready = true;
                    this.clientReady();
                }
            });
        }

        isActive() {
            return this.active;
        }

        runAction(action_data) {
            let activeUnit = this.field.getActiveUnit();
            activeUnit.setAction(action_data);
        }

        renderLoop() {
            let time,
                isActive = this.isActive.bind(this),
                exec = this.exec.bind(this);

            function step() {
                let now = Date.now(),
                    dt = now - (time || now);

                time = now;

                if (isActive()) {
                    requestAnimationFrame(step);
                }

                exec(dt);
            }

            step();
        }

        exec(dt) {
            let activeUnit = this.field.getActiveUnit();
            if (activeUnit) {
                activeUnit.update(dt);
            }

            this.renderAll();
        }

        renderAll() {
            this.field.draw(this.ctx);
        }
    }

    // export
    window.Game = Game;

})();
