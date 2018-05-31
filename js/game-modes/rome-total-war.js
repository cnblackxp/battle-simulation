import { Hero } from "../units/hero.js";
import { Archer } from "../units/archer.js";
import { Tank } from "../units/tank.js";
import { Halberdier } from "../units/halberdier.js";
import { canvas, teams, Teams, gameObject } from "../state.js";
import { clearArray } from "../utils.js";

const Quarter = {
    first: 1,
    second: 2,
    third: 3,
    forth: 4
}

const instaniateUnits = (type, amount, quarter, team) => {

    for (let i = 0; i < amount; i ++) {
        let x, y;
        y = Math.floor(Math.random() * canvas.height);
        switch (quarter) {
            case Quarter.first:
                x = Math.floor(Math.random() * canvas.width/4);
                break;
            case Quarter.second:
                x = canvas.width/4 + Math.floor(Math.random() * canvas.width/4);
                break;
            case Quarter.third:
                x = canvas.width/2 + Math.floor(Math.random() * canvas.width/4);
                break;
            case Quarter.forth:
                x = canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4);
                break;
        }

        const unit = eval(`new ${type}(x, y, team)`);
        unit.push(gameObject, teams[team]);
    } 
}


export default {
    init(unitSize = {
        blue: {
            heros: 100,
            archers: 100,
            tanks: 25,
            halberdiers: 0,
        },
        red: {
            heros: 100,
            archers: 100,
            tanks: 25,
            halberdiers: 0,
        }
    }) {
        clearArray(gameObject)
        teams["blue"] = [];
        teams["red"] = [];


        //red team
        instaniateUnits('Archer', unitSize.red.archers, Quarter.first, 'red');
        instaniateUnits('Hero', unitSize.red.heros, Quarter.second, 'red');
        instaniateUnits('Tank', unitSize.red.tanks, Quarter.second, 'red');
        instaniateUnits('Halberdier' , unitSize.red.halberdiers, Quarter.second, 'red');

        //blue team
        instaniateUnits('Archer', unitSize.blue.archers, Quarter.forth, 'blue');
        instaniateUnits('Hero', unitSize.blue.heros, Quarter.third, 'blue');
        instaniateUnits('Tank', unitSize.blue.tanks, Quarter.third, 'blue');
        instaniateUnits('Halberdier' , unitSize.blue.halberdiers, Quarter.third, 'blue');
    }
} 