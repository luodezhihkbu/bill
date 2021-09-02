<template>
  <div class="notFound">
    <div class="hint">当前页面不存在，请检查网址是否正确</div>
    <div class="redirect">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NotFound'
  };
</script>

<style lang="scss" scoped>
  .notFound {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .hint {
      padding: 100px 0 20px 0;
    }
    .redirect {
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
</style>