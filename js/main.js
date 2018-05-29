import { Hero } from "./units/hero.js";
import { canvas, ctx } from './state.js'; 
import { Teams, gameObject, teams } from './state.js';

import FPS from './fps.js';
import { Archer } from "./units/archer.js";
import { Tank } from "./units/tank.js";

window['teams'] = teams;



const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);


new Archer();


//meaning 10000 units
//5000 on each side
for (let i = 0; i < 250; i ++) {
    const redHero = new Hero(
        canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
        Math.floor(Math.random() * canvas.height),
        Teams.RED
    );
    const redArcher = new Archer(
        Math.floor(Math.random() * canvas.width/4),
        Math.floor(Math.random() * canvas.height),
        Teams.RED
    );

    const blueHero = new Hero(
        canvas.width/2 + Math.floor(Math.random() * canvas.width/4),
        Math.floor(Math.random() * canvas.height),
        Teams.BLUE
    )
    const blueArcher = new Archer(
        canvas.width/2 + canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
        Math.floor(Math.random() * canvas.height),
        Teams.BLUE
    )

    redHero.push(gameObject, teams['red']);
    redArcher.push(gameObject, teams['red']);

    blueHero.push(gameObject, teams['blue']);
    blueArcher.push(gameObject, teams['blue']);
}


for (let i = 0; i < 25; i ++) {
    const redTank = new Tank(
        canvas.width/4 + Math.floor(Math.random() * canvas.width/4),
        Math.floor(Math.random() * canvas.height),
        Teams.RED
    );
    redTank.push(gameObject, teams['red']);

}
// gameObject.forEach(el => el.init());




const update = () => {
    FPS.update();


    gameObject.forEach(el => el.update());
}
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    gameObject.forEach(el => el.draw());

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, 150, 100);
       
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0,0, 150, 100);

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
    
}


ctx.font = '16px Arial'; 
setInterval(() => {
    update();
    render();
}, 1000/30);
