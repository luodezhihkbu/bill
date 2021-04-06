<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-'
    interval = 'day'
    typeList = [
      {text: '支出', value: '-'},
      {text: '收入', value: '+'},
    ];
    intervalList = [
      {text: '按天', value: 'day'},
      {text: '按周', value: 'week'},
      {text: '按月', value: 'month'},
    ];
  }
</script>

<style lang="scss" scoped>
  // style 里有 scoped 就只能修改当前组件的样式；
  // 如果要修改外部组件 <Tags/> 的样式，需要在元素前加上 ::v-deep （注意后面有空格）；
  // 或者把 scoped 删掉，这样就会覆盖外部组件的样式
  ::v-deep .type-tabs-item {
    background: white;
    &.selected {
      background: #C4C4C4;
      &::after {
        display: none;
      }
    }
  }
</style>