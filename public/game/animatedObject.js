(function() {
    'use strict';

    // Size of one field cell
    const cellSize = 40;


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
                    if (this.animation.finishstate.x) {
                        this.x = this._getcoordfromraw(this.animation.finishstate.x);
                    }
                    if (this.animation.finishstate.y) {
                        this.y = this._getcoordfromraw(this.animation.finishstate.y);
                    }
                }
            }
        }

        /* Set animation and starts animation */
        runAnimation(animation) {
            if (animation.finishstate.x) {
                animation.finishstate.rawX = this._getRawCoord(animation.finishstate.x);
                delete animation.finishstate.x;
            }
            if (animation.finishstate.y) {
                animation.finishstate.rawY = this._getRawCoord(animation.finishstate.y);
                delete animation.finishstate.y;
            }

            this.animation = animation.run();
            this.isAnimated = true;
        }

        _getRawCoord(coord) {
            return coord * cellSize;
        }

        _getCoordFromRaw(rawCoord) {
            return rawCoord / cellSize ^ 0;
        }
    }


    // exports
    window.cellSize = cellSize;
    window.AnimatedObject = AnimatedObject;

})();
