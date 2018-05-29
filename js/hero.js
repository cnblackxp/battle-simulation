import { canvas, ctx } from './state.js'; 
import {dist, angleBetween} from './utils.js';
import { Teams, gameObject, teams } from './state.js';


import {StateMachine} from './state-machine.js';

export class Hero extends StateMachine {
    constructor(x = 0, y = 0, team) {
        super();
        this.x = x;
        this.y = y;
        this.team = team;

        this.target = undefined;
        this.health = 100;
        this.damage = 1;
        this.speed = 0.5;
        this.rotation = 0;


        this.setState('idle', () => {
            // console.log(this);
            // console.log('idle');
            this.findTarget();
        });
        this.setState('move', () => {
            this.rotation = angleBetween(this, this.target);
            this.x += Math.cos(this.rotation) * this.speed;
            this.y += Math.sin(this.rotation) * this.speed;
        });
        this.setState('attack', () => {
            this.target.health -= this.damage;
        })
        this.setStateCondition('move', () => this.target !== undefined, ['idle']);
        this.setStateCondition('attack', () => this.target && dist(this, this.target) < 14, ['move', 'idle']);
        this.setStateCondition('idle', () => this.target.health <= 0, ['move','attack'])



        this.arrayRefrences = [];
    }
    push(arr) {
        arr.push(this);
        this.arrayRefrences.push(arr);
    }
    kill() {
        this.arrayRefrences.forEach(el => el.splice(el.indexOf(this), 1));
    }
    update() {
        super.update();
        // if (!this.target)
        //     init();
        // this.rotation = angleBetween(this, this.target);
        // this.x += Math.cos(this.rotation) * this.speed;
        // this.y += Math.sin(this.rotation) * this.speed;

        // if (dist(this, this.target) < 1) {
        //     this.health --;
        //     this.target.health -= this.damage;
        //     // if (this.target.health <= 0) {
        //     //     this.health += 100;
        //     //     this.damage += 0.25;
        //     // }
        // }
        
        if (this.health <= 0) {
            this.kill();
            // teams[this.team].splice(teams[this.team].indexOf(this), 1);
            // gameObject.splice(gameObject.indexOf(this), 1);
        }

    }
    draw() {
        ctx.fillStyle = this.team;
        // ctx.fillRect(this.x, this.y, Hero.size * this.damage/2, Hero.size * this.damage/2);
        ctx.fillRect(this.x, this.y, Hero.size, Hero.size);
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
Hero.size = 7;