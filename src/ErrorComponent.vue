<template>
  <p>{{ $errors.first(field) }}</p>
</template>
<script>
export default {
  props: {
    field: {
      require: true
    }
  }
};
</script>