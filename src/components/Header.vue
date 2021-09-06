<template>
  <div class="header">
    <Icon class="leftIcon" name="left" @click="goBack"/>
    <span class="title">
      <slot/>
    </span>
    <span class="rightIcon"></span>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class Header extends Vue {
    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .header {
    font-size: 16px;
    padding: 12px 16px;
    background: $color-theme;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftIcon {
      width: 18px;
      height: 18px;
      color: #666;
    }
    .rightIcon {
      width: 18px;
      height: 18px;
    }
  }
</style>