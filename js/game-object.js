export class GameObject {
    constructor() {
        this.arrayRefrences = [];
    }
    _appendArray(arr) {
        if (this.arrayRefrences.indexOf(arr) === -1) {
            arr.push(this);
            this.arrayRefrences.push(arr); 
        }
    }
    push(arr) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i ++) {
                this._appendArray(arguments[i]);     
            }
        } else {
            this._appendArray(arr);           
        }
    }
    kill() {
        this.arrayRefrences.forEach(el => el.splice(el.indexOf(this), 1));
    }
}