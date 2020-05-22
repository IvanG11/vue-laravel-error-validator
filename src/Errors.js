class Errors {

    constructor() {
        this.errors = {};
    }

    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string|null} field
     */
    has(field){
        return this.errors[field] !== undefined
    }

    /**
     * Return the first error for the given field or object.
     *
     * @param {string|null} field
     */
    first(key) {
        if(this.has(key)){
            return this.errors[key][0]
        }
    }

    /**
     * Determine if we have any errors.
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Get field that error
     * @param field
     * @returns {*|*[]}
     */
    get(field) {
        return this.errors[field] || [];
    }

    /**
     * Get all errors
     * @returns {{}}
     */
    all() {
        return this.errors
    }

    /**
     * Flush error
     */
    flush() {
        this.errors = {};
    }

    /**
     * Record the error object
     * @param errors
     */
    record(errors = {}) {
        this.errors = errors;
    }

    /**
     * Clear one or all error fields.
     *
     * @param {String|undefined} field
     */
    clear(field) {
        if (!field) return this.flush();
        let errors = Object.assign({}, this.errors);
        Object.keys(errors)
            .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
            .forEach(e => delete errors[e]);
        this.record(errors);
    }

    /**
     * Clear errors on keydown.
     *
     * @param {KeyboardEvent} event
     */
    onKeydown(event) {
        if (event.target.name) {
            this.clear(event.target.name);
        }
    }

}

export default new Errors()