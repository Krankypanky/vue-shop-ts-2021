<template lang="ts">
<div></div>;
</template>
<script lang="ts">
import { defineComponent } from "vue";

type NavigationState = {
    isLoggedIn: boolean
};

export default defineComponent({
  data: (): NavigationState => ({
      isLoggedIn: true
  }),
});
</script>
<style lang="ts">
</style>