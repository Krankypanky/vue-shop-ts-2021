<template>
  <ul id="errors" class="mt-5 text-red-600">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    errors: Array,
  },
});
</script>
