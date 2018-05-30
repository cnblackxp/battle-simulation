import { Hero } from "./units/hero.js";
import { canvas, ctx } from './state.js'; 
import { Teams, gameObject, teams } from './state.js';

import FPS from './fps.js';
import { Archer } from "./units/archer.js";
import { Tank } from "./units/tank.js";
import { Arrow } from "./arrow.js";

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
    const redArcher = new Archer(
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
        ctx.lineWidth = 3;
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'white';
        ctx.strokeText('BLUE WON', canvas.width/2, canvas.height/2);
        ctx.fillText('BLUE WON', canvas.width/2, canvas.height/2);
    }

    if (teams['blue'].length === 0) {
        ctx.font = '50px Arial';
        ctx.lineWidth = 3;
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
