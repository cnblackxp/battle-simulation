export default {
    fps : 30,
    lastCalledTime : 0,
    counter : 0,
    rate() {
        return `${Math.floor(this.counter)}/${this.fps}`;
    },
    update() {
        if (!this.lastCalledTime) {
            this.lastCalledTime = Date.now();
            this.counter = 0;
            return;
        }
        const delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        this.counter = 1 / delta;
    }
};