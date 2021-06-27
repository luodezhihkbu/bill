<template>
  <!--  使用哪个 icon 就用对应的 name-->
  <svg class="icon" @click="$emit('click', $event)">
    <!-- 点击小 svg，触发大 Svg 的点击事件 -->
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
  // 一次导入所有 svg 文件
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);} // 注意路径要根据实际情况改写
  export default {
    props: ['name'], // name 的值从 Nva.vue 里获取
    name: 'Icon'
  };
</script>

<style lang="scss" scoped>
  /* 给 icon 添加默认样式 */
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>