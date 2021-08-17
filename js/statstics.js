import { ctx, teams, canvas } from "./state.js";
import { Arrow } from "./arrow.js";
import fps from "./fps.js";


function getTeamLength(team) {
    let teamCount = 0;
    team.forEach(unit => {
        if (unit.health > 0) {
            teamCount ++;
        }
    })
    return teamCount;
}

export default function statistics() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, 150, 150);
       
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0,0, 150, 150);
    
    
    ctx.font = '16px Arial'; 
    ctx.fillStyle = 'white';
    ctx.fillText('FPS: ' + fps.rate(), 12, 20);
    const redTeamCount = getTeamLength(teams['red']);
    const blueTeamCount = getTeamLength(teams['blue']);

    if (redTeamCount > blueTeamCount) {
        ctx.fillStyle = 'green';
        ctx.fillText('RED: ' + redTeamCount, 12, 40);
        ctx.fillStyle = 'yellow';        
        ctx.fillText('BLUE: ' + blueTeamCount, 12, 60);
    } else {
        ctx.fillStyle = 'green';
        ctx.fillText('BLUE: ' + blueTeamCount, 12, 40);
        ctx.fillStyle = 'yellow';        
        ctx.fillText('RED: ' + redTeamCount, 12, 60);
    }
    ctx.fillStyle = 'white';
    ctx.fillText('Total: ' + (redTeamCount+blueTeamCount), 12, 80);
    ctx.fillStyle = 'white';
    ctx.fillText('Arrows: ' + (Arrow.count), 12, 100);


    if (redTeamCount === 0) {
        ctx.font = '50px Arial';
        ctx.lineWidth = '3px';
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'white';
        ctx.strokeText('BLUE WON', canvas.width/2, canvas.height/2);
        ctx.fillText('BLUE WON', canvas.width/2, canvas.height/2);
    }

    if (blueTeamCount === 0) {
        ctx.font = '50px Arial';
        ctx.lineWidth = '3px';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'white';
        ctx.strokeText('RED WON', canvas.width/2, canvas.height/2);
        ctx.fillText('RED WON', canvas.width/2, canvas.height/2);
    }
}