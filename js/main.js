import { Hero } from "./units/hero.js";
import { canvas, ctx } from './state.js'; 
import { Teams, gameObject, teams } from './state.js';

import FPS from './fps.js';
import { Archer } from "./units/archer.js";
import { Tank } from "./units/tank.js";
import { Arrow } from "./arrow.js";


import RomeTotalWar from './game-modes/rome-total-war.js';

window['teams'] = teams;



const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

editRomeTotalWar.onclick = () => {
    const unitSize = {
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
    };

    for (let team in unitSize) {
        for (let type in unitSize[team]) {
            unitSize[team][type] = parseInt(document.querySelector(`#${team}-${type}`).value);
        }
    }

    RomeTotalWar.init(unitSize);    
}


// gameObject.forEach(el => el.init());


const defaultGame = {
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
}

RomeTotalWar.init(defaultGame);
// RomeTotalWar.init({
//     blue: {
//         heros: 10
//     },
//     red: {
//         halberdiers: 10
//     }
// });



const update = () => {
    FPS.update();


    gameObject.forEach(el => el.update());
}
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    gameObject.forEach(el => el.draw());

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, 150, 150);
       
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0,0, 150, 150);
    
    
    ctx.font = '16px Arial'; 
    ctx.fillStyle = 'white';
    ctx.fillText('FPS: ' + FPS.rate(), 12, 20);
    if (teams['red'].length > teams['blue'].length) {
        ctx.fillStyle = 'green';
        ctx.fillText('RED: ' + teams['red'].length, 12, 40);
        ctx.fillStyle = 'yellow';        
        ctx.fillText('BLUE: ' + teams['blue'].length, 12, 60);
    } else {
        ctx.fillStyle = 'green';
        ctx.fillText('BLUE: ' + teams['blue'].length, 12, 40);
        ctx.fillStyle = 'yellow';        
        ctx.fillText('RED: ' + teams['red'].length, 12, 60);
    }
    ctx.fillStyle = 'white';
    ctx.fillText('Total: ' + (teams['red'].length+teams['blue'].length), 12, 80);
    ctx.fillStyle = 'white';
    ctx.fillText('Arrows: ' + (Arrow.count), 12, 100);


    if (teams['red'].length === 0) {
        ctx.font = '50px Arial';
        ctx.lineWidth = '3px';
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'white';
        ctx.strokeText('BLUE WON', canvas.width/2, canvas.height/2);
        ctx.fillText('BLUE WON', canvas.width/2, canvas.height/2);
    }

    if (teams['blue'].length === 0) {
        ctx.font = '50px Arial';
        ctx.lineWidth = '3px';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'white';
        ctx.strokeText('RED WON', canvas.width/2, canvas.height/2);
        ctx.fillText('RED WON', canvas.width/2, canvas.height/2);
    }
    
}


setInterval(() => {
    update();
    render();
}, 1000/30);
