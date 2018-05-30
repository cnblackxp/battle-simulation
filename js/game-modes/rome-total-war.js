import { Hero } from "../units/hero.js";
import { Archer } from "../units/archer.js";
import { Tank } from "../units/tank.js";
import { canvas, teams, Teams, gameObject } from "../state.js";

export default {
    init() {
        //meaning 10000 units
        //5000 on each side
        for (let i = 0; i < 250; i ++) {
            //RED
            //TEAM
            new Hero(
                canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);
            new Hero(
                canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);
            new Archer(
                Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);


            //BLUE
            //TEAM
            new Hero(
                canvas.width/2 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Hero(
                canvas.width/2 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
        }


        for (let i = 0; i < 25; i ++) {
            new Tank(
                canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);

        }
    }
} 