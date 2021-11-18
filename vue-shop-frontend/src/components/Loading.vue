<template>
  <span
    v-if="loading"
    class="
      absolute
      top-0
      left-0
      z-50
      flex
      items-center
      justify-center
      w-screen
      h-screen
      text-black
      bg-white
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
