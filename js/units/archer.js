import { Hero } from './hero.js';
import { ctx } from '../state.js';
import { Unit } from './unit.js';

export class Archer extends Hero {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);

        this.damage = 0.25;
        this.health = 100;
        this.speed = 0.5;
        
        this.alterStateCondition('attack', () => this.attackCondition(200));

    }
    draw() {
        super.draw();
        this.drawBorder();
    }
}