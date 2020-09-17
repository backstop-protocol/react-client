class _EventBus {

    constructor() {
        this.bus = {};
    }

    $on(id, callback) {
        this.bus[id] = callback;
    }

    $emit(id, ...variaveis) {
        this.bus[id](...variaveis);
    }
}

const EventBus = new _EventBus();

export default EventBus;
