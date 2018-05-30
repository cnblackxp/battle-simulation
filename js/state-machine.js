import { GameObject } from "./game-object.js";

Array.prototype.indexOfObject = function (key, value) {
    for (let i = 0; i < this.length; i ++) {
        if (this[i][key] === value) 
            return i;
    }
    return -1;
}

export class StateMachine extends GameObject {
    constructor() {
        super();
        this.states = {};
        this.state = undefined;
        this.statesToChangeTo = [];
    }

    getFullState() {
        return {
            states: {...this.states},
            statesToChangeTo: this.statesToChangeTo.splice()
        };
    }
    setFullState(stateObject) {
        const {states, statesToChangeTo} = stateObject;
        this.states = states;   
        this.statesToChangeTo = statesToChangeTo;   
    }
    clearFullState() {
        this.state = undefined;
        this.states = {};
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
    setStateBehaviour(state, behaviour) {
        this.states[state].behaviour = behaviour; 
    }
    removeState(key) {
        // console.log(this.states);

        if (!key)
            return console.error("some parameters are not filled");
        const newState = {};
        for (let _key in this.states) {
            if (_key !== key) {
                newState[_key] = this.states[_key];
            }
        }
        // console.log(newState);
        // newState.forEach(el => {
        // this.states.forEach(el => {
        for (let _key in this.states) {
            const el = this.states[_key];
            const index = el.statesToChangeTo.indexOfObject('state', key);
            if (index !== -1);
                el.statesToChangeTo.splice(index, 1);
            // console.log(el.statesToChangeTo[index]);
        }
        // console.log(newState);
        this.states = newState;

        const index = this.statesToChangeTo.indexOfObject('state', key);
        if (index !== -1)
            this.statesToChangeTo.splice(index, 1);
        // console.log(this.states);
        // });


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
    alterStateCondition(stateToChangeTo, condition) {
        this.getStates().forEach(state => {
            const index = this.states[state].statesToChangeTo.indexOfObject('state', stateToChangeTo);
            if (index !== -1)
                this.states[state].statesToChangeTo[index].condition = condition;
        })
    }
    
    // appendStateCondition(stateToChangeTo, stateCurrent){
    //     stateCurrent.forEach(el =>
    //         this.states[el].statesToChangeTo.push({
    //             state: stateToChangeTo,
    //             condition: condition
    //         })
    //     );
    // }

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