class Errors {

    constructor() {
        this.errors = {};
    }

    has(key){
        return this.errors[key] !== undefined
    }

    first(key) {
        if(this.has(key)){
            return this.errors[key][0]
        }
    }

    get(key) {
        if(this.has(key)){
            return this.errors[key]
        }
    }

    all() {
        return this.errors
    }

    record(values) {
        this.errors = values
    }

    clear(field) {
        if (field) {
            delete this.errors[field];

            return;
        }

        this.errors = {};
    }

}

export default new Errors()