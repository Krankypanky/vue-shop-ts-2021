<template>
  <ul id="errors" class="mt-5 text-red-600">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const ErrorRenderer = defineComponent({
  computed: {
    errors(): string[] {
      return this.$store.state.errors;
    },
  },
});
export default ErrorRenderer;
</script>
