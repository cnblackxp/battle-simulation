import * as gameData from './state.js';
import { GameObject } from './game-object.js';
import { angleBetween, dist } from './utils.js';

export const arrows = [];
export class Arrow extends GameObject {
    constructor(x = 0, y = 0, target, damage = 1, team) {
        super();
        this.x = x;
        this.y = y;
        // this.team = team;

        this.target = target;
        // this.health = 100;
        this.damage = damage;
        this.speed = 10;
        this.rotation = 0;

        Arrow.count++;
    }
    kill() {
        super.kill();
        Arrow.count--;
    }

    draw() {
        gameData.ctx.fillStyle = 'white';
        gameData.ctx.fillRect(this.x, this.y, Arrow.size, Arrow.size);
    }
    update() {
        this.rotation = angleBetween(this, this.target);
        this.x += Math.cos(this.rotation) * this.speed;
        this.y += Math.sin(this.rotation) * this.speed;

        if (dist(this, this.target) < Arrow.size/2 + this.target.size/2) {
            this.target.health -= this.damage;
            this.kill();
        }
    }
}
Arrow.size = 3;
Arrow.count = 0;
