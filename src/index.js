import Errors from './Errors'
import ErrorComponent from './ErrorComponent.vue'

class Validator{

    install(Vue){

        Vue.component('error', ErrorComponent);
        
        if (axios) {
            axios.interceptors.response.use((response) => {
                return response;
            }, (error) => {
                if (error.response.status === 422) {
                    Errors.record(error.response.data.errors)
                }

                return Promise.reject(error);
            });
        }

        Vue.mixin({
            beforeCreate(){
                this.$options.$errors = {};
                Vue.util.defineReactive(this.$options, '$errors', Errors);
                if(!this.$options.computed){
                    this.$options.computed = {}
                }
                this.$options.computed["$errors"] = function() {
                    return this.$options.$errors;
                };
            },
        })
    }
}

export default new Validator()