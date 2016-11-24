(function() {
    'use strict';

    // Size of one field cell
    const cellSize = 80;


    class AnimatedObject {
        constructor(x, y) {
            this.x = x;
            this.y = y;

            this.rawX = this._getRawCoord(this.x);
            this.rawY = this._getRawCoord(this.y);

            this.animation = undefined;
            this.isAnimated = false;
        }

        /* Draw object in current state */
        draw(ctx) {

        }

        /* Update objects props */
        update(dt) {
            if (this.animation) {
                this.animation.update(this, dt);

                if (this.animation.isFinished) {
                    // In case of movement needs to set new coords
                    console.log(this);
                    if (this.animation.finishState.rawX) {
                        console.log(this._getCoordFromRaw(this.animation.finishState.rawX));

                        this.x = this._getCoordFromRaw(this.animation.finishState.rawX);
                    }
                    if (this.animation.finishState.rawY) {
                        this.y = this._getCoordFromRaw(this.animation.finishState.rawY);
                    }

                    this.animation = undefined;
                }
            }
        }

        /* Set animation and starts animation */
        runAnimation(animation) {
            if (animation.finishState.x) {
                animation.finishState.rawX = this._getRawCoord(animation.finishState.x);
                delete animation.finishState.x;
            }
            if (animation.finishState.y) {
                animation.finishState.rawY = this._getRawCoord(animation.finishState.y);
                delete animation.finishState.y;
            }

            this.animation = animation.run();
            this.isAnimated = true;
        }

        _getRawCoord(coord) {
            return coord * cellSize;
        }

        _getCoordFromRaw(rawCoord) {
            return (rawCoord / cellSize ^ 0);
        }
    }


    // exports
    window.cellSize = cellSize;
    window.AnimatedObject = AnimatedObject;

})();
