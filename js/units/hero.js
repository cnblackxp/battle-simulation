import { Unit } from './unit.js';

export class Hero extends Unit {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);
        this.health = 100;
        this.damage = 1;
        this.speed = 1;
    }
}