import { Hero } from './hero.js';
import { ctx, gameObject } from '../state.js';
import { Unit } from './unit.js';
import { Arrow } from '../arrow.js';

export class Archer extends Hero {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);

        this.damage = 1;
        this.health = 25;
        this.speed = 0.5;
        
        this.fr = 0;
        this.frameRate = 15;

        this.setStateBehaviour('attack', () => {
            this.fr ++;
            if (this.fr >= this.frameRate) {
                this.fr = 0;

                new Arrow(
                    this.x, this.y, this.target, this.damage
                ).push(gameObject);
            }
        })
        this.alterStateCondition('attack', () => this.attackCondition(200));


    }
    draw() {
        super.draw();
        this.drawBorder();
    }
}