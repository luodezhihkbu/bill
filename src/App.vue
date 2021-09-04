<template>
  <div id="app">
    <router-view :style="`height:${pageHeight}px`"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    static pageHeight: number;
    pageHeight = window.innerHeight;
  }
  window.onresize = function () {
    App.pageHeight = window.innerHeight;
    window.location.reload();
  };
</script>

<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-family: $font-hei;
    line-height: 1.5;
    font-size: 16px;
    background: #f5f5f5;
  }
  #app {
    max-width: 500px;
    margin: 0 auto;
    @extend %outerShadow;
  }
</style>
