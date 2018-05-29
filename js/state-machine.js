export class StateMachine {
    constructor() {
        this.states = {};
        this.state = undefined;
        this.statesToChangeTo = [];
    }



    // player.setState('Attack', function() {});
    // player.setStateCondition('state to change to', [states u are on], function condition(){})
    setState(key, behaviour) {
        if (!key && !behaviour)
            return console.error("some parameters are not filled");
        this.states[key] = {
            behaviour : behaviour,
            statesToChangeTo : []
        };

        if (!this.state)
            this.state = key;
    }
    setStateCondition(stateToChangeTo, condition, stateCurrent) {
        if (stateCurrent)        
            stateCurrent.forEach(el =>
                this.states[el].statesToChangeTo.push({
                    state: stateToChangeTo,
                    condition: condition
                })
            );
        else
            this.statesToChangeTo.push({
                state: stateToChangeTo,
                condition
            })
    }

    setDefaultState(key) {
        if (this.states[key])
            this.state = key;
        else console.error("state doesn't exist");
    }
    getStates() {
        return Object.keys(this.states);
    }


    update() {
        if (this.state) {
            this.states[this.state].behaviour();
            this.states[this.state].statesToChangeTo.forEach(el => {
                if (el.condition()) {
                    // console.log(`unit changed from ${this.state} to ${el.state}`);
                    this.state = el.state;
                }
            });
        }

        this.statesToChangeTo.forEach(el => {
            if (el.condition()) {
                // console.log(`unit changed from ${this.state} to ${el.state}`);
                this.state = el.state;
            }
        });


    }
}