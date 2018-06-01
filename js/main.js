import { Hero } from "./units/hero.js";
import { canvas, ctx } from './state.js'; 
import { Teams, gameObject, teams } from './state.js';

import FPS from './fps.js';
import { Archer } from "./units/archer.js";
import { Tank } from "./units/tank.js";
import { Arrow } from "./arrow.js";


// import {  } from './game-modes/game-mode.js';

import RomeTotalWar from './game-modes/rome-total-war.js';
import statistics from "./statstics.js";
import { updateGameMode, drawGameMode, setGameMode } from "./game-modes/game-mode.js";

window['teams'] = teams;



const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);




// gameObject.forEach(el => el.init());
setGameMode(RomeTotalWar, RomeTotalWar.defaultGame);
// setGameMode(RomeTotalWar, RomeTotalWar.defaultGame);
// setGameMode(RomeTotalWar, RomeTotalWar.defaultGame);

const modes = {
    'RomeTotalWar' : RomeTotalWar,
    'Skirmish': RomeTotalWar
} 

Array.from(document.querySelectorAll('[data-game-mode]')).forEach(el => {
    el.onclick = () => {
        setGameMode(modes[el.getAttribute('data-game-mode')], modes[el.getAttribute('data-game-mode')].mainGame);
        document.querySelector('.haz-main-menu').style.display = 'none';
    }
})



const update = () => {
    FPS.update();
    updateGameMode();
    // if (gameMode)
    //     gameMode.update();

    // gameObject.forEach(el => el.update());
}
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameMode();
    // if (gameMode)
    //     gameMode.draw();


    // gameObject.forEach(el => el.draw());

    // statistics();
    
}


setInterval(() => {
    update();
    render();
}, 1000/30);
