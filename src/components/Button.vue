<template>
  <button class="button" @click="$emit('click', $event)">
    <!-- 点击小 button，触发大 Button 的点击事件 -->
    <slot/>
    <!-- slot 会被 Button 里的内容替换掉 -->
  </button>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {
  }
</script>

<style lang="scss" scoped>
  .button {
    background: #f9d961;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
</style>