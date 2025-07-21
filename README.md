# Vue Laravel Errors

This package allows to display errors from Laravel for Vue 3.

## Installation

You can install the package via npm:

```
npm install --save vue-laravel-error-validator
```

### Setup

```javascript
import { createApp } from 'vue'
import LaravelErrorValidator from "vue-laravel-error-validator";
import App from './App.vue'

const app = createApp(App)
app.use(LaravelErrorValidator)
app.mount('#app')
```

## Usage

### Options API (Vue 3)

Once the plugin is registered, you can access the error handler using `$errors`:

```vue
<template>
  <div>
    <input type="text" v-model="form.name">
    <p class="error" v-if="$errors.has('name')">{{ $errors.first('name') }}</p>
    
    <!-- Or use the included error component -->
    <error field="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    submitForm() {
      axios.post('/api/endpoint', this.form)
        .catch(error => {
          // Validation errors are automatically captured by the axios interceptor
          // if the status code is 422
        });
    }
  }
}
</script>
```

### Composition API

You can also use the provided `useErrors` composable:

```vue
<template>
  <div>
    <input type="text" v-model="form.name">
    <p class="error" v-if="errors.has('name')">{{ errors.first('name') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useErrors } from 'vue-laravel-error-validator';

const errors = useErrors();
const form = ref({ name: '' });

function submitForm() {
  axios.post('/api/endpoint', form.value);
}
</script>
```

## Available Methods

- `has(field)`: Check if a field has any errors
- `first(field)`: Get the first error message for a field
- `get(field)`: Get all error messages for a field
- `all()`: Get all error messages
- `any()`: Check if there are any errors
- `record(errors)`: Set the error object
- `clear(field)`: Clear a specific field's errors (or all if no field is specified)
- `flush()`: Clear all errors
- `onKeydown(event)`: Clear errors on keydown event

## Automatic Error Handling

The plugin automatically intercepts 422 responses from Laravel backend and captures validation errors if Axios is available globally.
