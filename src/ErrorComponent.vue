<template>
  <p>{{ $errors.first(field) }}</p>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
});

const errors = inject("errors");
</script>
