<template>
  <ul id="errors" class="mt-5 text-red-600">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const ErrorRenderer = defineComponent({
  props: {
    errors: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
export default ErrorRenderer;
</script>
