class _EventBus {

    constructor() {
        this.bus = {};
    }

    $on(id, callback) {
        if (!this.bus[id]) this.bus[id] = [];
        this.bus[id].push(callback);
    }

    $off(id, callback) {
        if (!this.bus[id]) return;
        for (let i = this.bus[id].length-1; i >= 0; i--) {
            if (this.bus[id][i] === callback) {
                this.bus.splice(i, 1);
                return;
            }
        }
    }

    $emit(id, ...vars) {
        if (this.bus[id]) {
            for (let callback of this.bus[id]) callback(...vars);
        }
    }
}

const EventBus = new _EventBus();

export default EventBus;
