<template>
  <span
    v-if="loading"
    class="
      bg-white
      text-black
      h-screen
      w-screen
      absolute
      left-0
      top-0
      flex
      justify-center
      items-center
      z-50
    "
    >Loading...
  </span>
</template>

<script lang="ts">
type LoadingProps = {
  loading: boolean;
};
// example of props passing
export default {
  data: (props: LoadingProps): Record<string, unknown> => {
    const { loading } = props;
    return {
      loading,
    };
  },
};
</script>
