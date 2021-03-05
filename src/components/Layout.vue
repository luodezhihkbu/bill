<template>
  <div class="wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
  name: "Layout"
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    flex-grow: 1;
    overflow: auto;
  }
</style>