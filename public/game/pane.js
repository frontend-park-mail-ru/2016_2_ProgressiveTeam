(function() {
    'use strict';

    class Pane {
        constructor(field, timeline) {
            this.field = field;
            this.timeline = timeline;
        }

        /**
         * Toggle animation while opponent is not ready
         */
        toggleWaitOpponentAnim() {

        }

        startMyTurn(turn) {
            this.field.setActiveUnit(turn.unit_id);
        }
    }


    // export
    window.Pane = Pane;

})();
