import { Unit } from './unit.js';

export class Hero extends Unit {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);
        this.health = 300;
        this.damage = 2;
        this.speed = 1;
    }
}