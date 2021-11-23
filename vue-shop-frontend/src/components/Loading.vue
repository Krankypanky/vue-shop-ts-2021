<template>
  <span
    v-if="loading"
    class="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen text-black bg-white "
    >Loading...
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    loading(): boolean {
      return this.$store.state.loading;
    },
  },
});
</script>
