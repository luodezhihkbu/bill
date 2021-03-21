<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
  export default {
  name: "Types"
}
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;
    li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // 选中"支出"或"收入"后底部出现黑色线条
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333333;
      }
    }
  }
</style>