import { ctx, teams, canvas } from "./state.js";
import { Arrow } from "./arrow.js";
import fps from "./fps.js";

export default function statistics() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, 150, 150);
       
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0,0, 150, 150);
    
    
    ctx.font = '16px Arial'; 
    ctx.fillStyle = 'white';
    ctx.fillText('FPS: ' + fps.rate(), 12, 20);
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