(function () {
    'use strict';

    const cellSize = window.cellSize;

    class Field {
        constructor({ x = 0, y = 0, count_x = 0, count_y = 0 }) {
            this.x = x;
            this.y = y;

            this.count_x = count_x;
            this.count_y = count_y;

            this.backgoundColor = "rgba(255, 255, 255, 0.8)";
            this.gridColor = '#616161';

            this.init();
        }

        init() {
            this._width = this.count_x * cellSize;
            this._height = this.count_y * cellSize;

            this.clearMap();
        }

        update(dt) {

        }

        updateUnits(unit_list) {
            clearMap();
            unit_list.forEach(unit => {
                if (unit.x < this.count_x && unit.y < this.count_y) {
                    this.map[unit.x][unit.y] = unit;
                }
            });
        }

        addUnits(unit_list) {
            unit_list.forEach(unit => {
                if (unit.x < this.count_x && unit.y < this.count_y) {
                    this.map[unit.x][unit.y] = unit;
                }
            });
        }

        clearMap() {
            this.map = new Array(this.count_x)
                .fill()
                .map(() => new Array(this.count_y));
        }

        /**
         * Get units position to initialize game
         */
        getPosition() {
            let position_list = [];
            this.map.forEach(l => l.forEach(unit => {
                position_list.push({
                    type: unit.type,
                    coords: unit.coords
                });
            }));
            return position_list;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this._width, this._height)
            ctx.fillStyle = this.backgoundColor;
            ctx.fill();
            ctx.strokeStyle = this.gridColor;
            ctx.lineWidth = 1;
            for (let i = 0; i < this._width; i += cellSize) {
                ctx.moveTo(i + 0.5, 0.5);
                ctx.lineTo(i + 0.5, this._height + 0.5);
            }
            for (let j = 0; j < this._height; j += cellSize) {
                ctx.moveTo(0.5, j + 0.5);
                ctx.lineTo(this._width + 0.5, j + 0.5);
            }
            ctx.stroke();
            ctx.closePath();

            this.drawMap(ctx);
        }

        drawMap(ctx) {
            this.map.forEach(ar => ar.forEach(el => el.draw(ctx)));
        }

        setActiveUnit(unit_id) {
            this.map.forEach(ar => ar.forEach(el => {
                if (unit_id == el.id) {
                    this.activeUnit = el;
                    el.active = true;
                }
            }));
        }

        getActiveUnit() {
            return this.activeUnit;
        }


        clicked(event) {
            return this.map[event.x][event.y];
        }

        getCellToMove(event) {
            // TODO calculate cell to move
        }

        animate(ctx, action, {coords = [-1, -1]}) {
            // TODO add animation
            switch (action) {
                case 'move':

                    break;
            }
        }

        _animationFunc(isContinue) {

            if (isContinue) {
                setTimeout(_animationFunc, 20);
            }
        }
    }

    // export
    window.Field = Field;

})();
