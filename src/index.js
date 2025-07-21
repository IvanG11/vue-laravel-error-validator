import Errors from "./Errors";
import ErrorComponent from "./ErrorComponent.vue";

// Crear el plugin para Vue 3
const LaravelErrorValidator = {
  install(app, options) {
    // Registrar el componente global
    app.component("error", ErrorComponent);

    // Configurar el interceptor de Axios si está disponible
    if (typeof axios !== "undefined") {
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response && error.response.status === 422) {
            Errors.record(error.response.data.errors);
          }

          return Promise.reject(error);
        }
      );
    }

    // Proporcionar la instancia de errores a la aplicación
    app.config.globalProperties.$errors = Errors;

    // Exponer la instancia de errores para composition API
    app.provide("errors", Errors);
  },
};

// Exportar una función de conveniencia para usar con la Composition API
export function useErrors() {
  return Errors;
}

export default LaravelErrorValidator;
