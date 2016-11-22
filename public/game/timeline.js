(function() {
    'use strict';

    class TimeLine {

        constructor() {
            this.query = {}; 
            this.counter = 0;
        }

        update(cell_list) {
            cell_list.forEach(cell => {
                this.query[cell.id] = {
                    unit_id: cell.unit_id,
                    user_id: cell.user_id
                };
            }); 
        }

        /**
         * @returns current cell
         */
        pop() {
            this.counter += 1;
            return this.query[this.counter - 1];
        }

    }

    // export
    window.TimeLine = TimeLine;

})();
