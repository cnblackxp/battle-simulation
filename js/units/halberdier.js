import { Unit } from "./unit.js";
import { ctx } from "../state.js";
import { Hero } from "./hero.js";
import { Tank } from "./tank.js";

export class Halberdier extends Unit {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);

        this.damageBouns = [
            {
                type: Tank,
                damage: 100,
            }
        ];
    }

    draw() {
        ctx.fillStyle = this.team;
        ctx.strokeStyle ='white';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
        ctx.fill();
    }


} 