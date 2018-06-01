import { canvas, teams, Teams, gameObject } from "../state.js";
import { clearArray } from "../utils.js";
import GameMode, { instaniateUnits, Quarter } from "./game-mode.js";

class RomeTotalWar extends GameMode {
    constructor() {
        super();
        this.ui = 'RomeTotalWar';
        this.defaultGame = {
            blue: {
                heros: 100,
                archers: 100,
                tanks: 25,
            },
            red: {
                heros: 100,
                archers: 100,
                tanks: 25,
            },
            displayUI: false
        }
        this.mainGame = {
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
            },
            displayUI: true
        }
    }
    init(options = {
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
        },
        displayUI: true
    }) {
        super.init(options);
        editRomeTotalWar.onclick = () => {
            for (let team in this.defaultGame) {
                for (let type in this.defaultGame[team]) {
                    this.defaultGame[team][type] = parseInt(document.querySelector(`#${team}-${type}`).value);
                }
            }
        
            this.init(this.defaultGame);    
        }


        // console.log(options);

        //red team
        instaniateUnits('Archer', options.red.archers, Quarter.first, 'red');
        instaniateUnits('Hero', options.red.heros, Quarter.second, 'red');
        instaniateUnits('Tank', options.red.tanks, Quarter.second, 'red');
        instaniateUnits('Halberdier' , options.red.halberdiers, Quarter.second, 'red');

        //blue team
        instaniateUnits('Archer', options.blue.archers, Quarter.forth, 'blue');
        instaniateUnits('Hero', options.blue.heros, Quarter.third, 'blue');
        instaniateUnits('Tank', options.blue.tanks, Quarter.third, 'blue');
        instaniateUnits('Halberdier' , options.blue.halberdiers, Quarter.third, 'blue');
    }
}

export default new RomeTotalWar();