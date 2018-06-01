import { Unit } from './unit.js';
import { Halberdier } from './halberdier.js';

console.log('hero');

export class Hero extends Unit {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);
        this.health = 100;
        this.damage = 5;
        this.speed = 1;

        this.damageBouns = [
            {
                type: Halberdier,
                damage: 100
            }
        ]
    }
}