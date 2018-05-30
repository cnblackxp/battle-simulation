import { Hero } from "../units/hero.js";
import { Archer } from "../units/archer.js";
import { Tank } from "../units/tank.js";
import { canvas, teams, Teams, gameObject } from "../state.js";
import { clearArray } from "../utils.js";

export default {
    init(unitSize = {
        blue: {
            heros: 100,
            archers: 100,
            tanks: 25,
        },
        red: {
            heros: 100,
            archers: 100,
            tanks: 25,
        }
    }) {
        clearArray(gameObject)
        teams["blue"] = [];
        teams["red"] = [];
        //meaning 10000 units
        //5000 on each side
        for (let i = 0; i < unitSize.blue.heros; i ++) {
            new Hero(
                canvas.width/2 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
        }
        for (let i = 0; i < unitSize.blue.archers; i ++) {
            new Archer(
                canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
        }
        for (let i = 0; i < unitSize.blue.tanks; i ++) {
            new Tank(
                canvas.width/2 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.BLUE
            ).push(gameObject, teams['blue']);
        }
        
        
        for (let i = 0; i < unitSize.red.heros; i ++) {
            new Hero(
                canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);
        }
        for (let i = 0; i < unitSize.red.archers; i ++) {
            new Archer(
                Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);
        }
        for (let i = 0; i < unitSize.red.tanks; i ++) {
            new Tank(
                canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
                Math.floor(Math.random() * canvas.height),
                Teams.RED
            ).push(gameObject, teams['red']);
        }
    }
} 