<template>
  <div class="wrapper">
    <div class="content">
      money
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
name: "Money"
}
</script>

<style lang="scss" scoped>
  .wrapper {
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    border: 1px solid blue;
    flex-grow: 1;
    overflow: auto;
  }
</style>