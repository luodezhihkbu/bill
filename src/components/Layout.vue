<template>
  <!-- 给下面两个 div 绑定一个带前缀 classPrefix 的类名，是为了能在外部组件 Money.vue 里控制这两个 div 的样式 -->
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Layout',
    props: ['classPrefix']
  };
</script>

<style lang="scss" scoped>
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    flex-grow: 1;
    overflow: auto;
  }
</style>