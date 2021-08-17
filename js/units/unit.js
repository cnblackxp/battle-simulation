import { dist, angleBetween } from '../utils.js';
import { canvas, ctx, Teams, gameObject, teams } from '../state.js';

import { StateMachine } from '../state-machine.js';



export class Unit extends StateMachine {
    constructor(x = 0, y = 0, team) {
        super();
        this.x = x;
        this.y = y;
        this.team = team;

        this.target = undefined;
        this.health = 100;
        this.damage = 1;
        this.speed = 1;
        this.rotation = 0;

        this.color = this.team;

        this.size = Unit.size;

        this.damageBouns = [];


        this.setState('idle', this.findTarget);
        this.setState('move', this.move);
        this.setState('attack', this.attack)
        // this.setState('dead', this.dead)

        this.setStateCondition('move', this.moveCondition, ['idle']);
        this.setStateCondition('attack', this.attackCondition, ['move', 'idle']);
        this.setStateCondition('idle', this.idleCondition, ['move','attack']);
        // this.setStateCondition('dead', this.deadCondition, ['idle', 'move', 'attack']);



        this.arrayRefrences = [];
    }
    //------------------
    //------------------
    //------------------
    //------------------state functions
    findTarget = () => {
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
    checkCollision = () => {
        //collision check
        for (let team in teams) {
            for (let i = 0; i < teams[team].length; i++) {
                const unit = teams[team][i];
                if (unit !== this && unit.health > 0) {
                    if (dist(this, unit) < this.size/2 + unit.size/2) {
                        const rot = angleBetween(this, unit);
                        this.x -= Math.cos(rot) * this.speed;
                        this.y -= Math.sin(rot) * this.speed;
                    }
                }
            }
        }
    }
    move = () => {
        this.rotation = angleBetween(this, this.target);
        this.x += Math.cos(this.rotation) * this.speed;
        this.y += Math.sin(this.rotation) * this.speed;

        this.checkCollision();
    }
    attack = () => {
        this.target.health -= this.damage;

        if (this.damageBouns.length > 0) {
            this.damageBouns.forEach(el => {
                if (this.target instanceof el.type) {
                    this.target.health -= el.damage;
                }
            })
        }
    }
    // dead = () => {
    //     this.color = 'gray';
    // }

    attackCondition = (_dist = 14) => this.target && dist(this, this.target) < _dist;
    idleCondition = () => this.target.health <= 0;
    moveCondition = () => this.target !== undefined;
    deadCondition = () => this.health <= 0;
    //------------------state functions
    //------------------
    //------------------
    //------------------
    update() {
        super.update();
        if (this.health <= 0) {
            this.kill();
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    drawBorder(color = 'white', lineWidth = '4px') {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}
Unit.size = 7;