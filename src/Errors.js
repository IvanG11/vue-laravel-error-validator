import { reactive } from 'vue';

class Errors {

    constructor() {
        // Hacemos que el objeto errors sea reactivo con Vue 3
        this.errors = reactive({});
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
        return null; // Explícitamente devolver null para evitar valores undefined en Vue 3
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
        // En Vue 3, debemos mantener la referencia al objeto reactivo
        Object.keys(this.errors).forEach(key => {
            delete this.errors[key];
        });
    }

    /**
     * Record the error object
     * @param errors
     */
    record(errors = {}) {
        this.flush();
        // Añadir las nuevas propiedades al objeto reactivo
        Object.entries(errors).forEach(([key, value]) => {
            this.errors[key] = value;
        });
    }

    /**
     * Clear one or all error fields.
     *
     * @param {String|undefined} field
     */
    clear(field) {
        if (!field) return this.flush();
        
        Object.keys(this.errors)
            .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
            .forEach(e => delete this.errors[e]);
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

// Exportar una única instancia reactiva para toda la aplicación
export default new Errors()