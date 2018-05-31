import { Unit } from './unit.js';

export class Tank extends Unit {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);
        this.health = 500;
        this.damage = 10;
        this.speed = 0.4;

        this.size = Unit.size * 2;
    }

    draw() {
        super.draw();
        this.drawBorder();
    }
}