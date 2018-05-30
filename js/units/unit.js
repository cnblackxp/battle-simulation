import { dist, angleBetween } from '../utils.js';
import { canvas, ctx, Teams, gameObject, teams } from '../state.js';

import {StateMachine} from '../state-machine.js';



export class Unit extends StateMachine {
    constructor(x = 0, y = 0, team) {
        super(x, y, team);
        this.x = x;
        this.y = y;
        this.team = team;

        this.target = undefined;
        this.health = 100;
        this.damage = 1;
        this.speed = 1;
        this.rotation = 0;

        this.size = Unit.size;


        this.setState('idle', () => {
            // console.log(this);
            // console.log('idle');
            this.findTarget();
        });
        this.setState('move', () => {
            this.move();
        });
        this.setState('attack', () => {
            this.attack();
        })
        this.setStateCondition('move', () => this.target !== undefined, ['idle']);
        this.setStateCondition('attack', () => this.attackCondition(), ['move', 'idle']);
        this.setStateCondition('idle', () => this.target.health <= 0, ['move','attack']);



        this.arrayRefrences = [];
    }
    //state functions
    move() {
        this.rotation = angleBetween(this, this.target);
        this.x += Math.cos(this.rotation) * this.speed;
        this.y += Math.sin(this.rotation) * this.speed;

        //collision check
        for (let team in teams) {
            teams[team].forEach(unit => {
                if (unit !== this) {
                    if (dist(this, unit) < this.size/2 + unit.size/2) {
                        const rot = angleBetween(this, unit);
                        this.x -= Math.cos(rot) * this.speed;
                        this.y -= Math.sin(rot) * this.speed;
                    }
                }
            })
        }
    }
    attack() {
        this.target.health -= this.damage;
    }

    attackCondition(_dist = 14) {
        return this.target && dist(this, this.target) < _dist;
    }
    //------------------state functions
    update() {
        super.update();
        if (this.health <= 0) {
            this.kill();
        }

    }
    draw() {
        ctx.fillStyle = this.team;
        // ctx.fillRect(this.x, this.y, Unit.size * this.damage/2, Unit.size * this.damage/2);
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    drawBorder(color = 'white', lineWidth = '4px') {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }


    findTarget() {
        const enemyTeam = this.team === Teams.RED ? Teams.BLUE : Teams.RED;
        if (teams[enemyTeam].length <= 0)
            return this.target = undefined;
        let closestEnemy = {
            dist: dist(this, teams[enemyTeam][0]),
            enemy: teams[enemyTeam][0]
        }
        teams[enemyTeam].forEach(el => {
            if (dist(this, el) < closestEnemy.dist && el.health > 0) {
                closestEnemy = {
                    dist: dist(this, el),
                    enemy: el
                }
            }
        })

        this.target = closestEnemy.enemy;
    }
}
Unit.size = 7;