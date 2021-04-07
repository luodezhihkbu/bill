<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    interval = 'day';
    recordTypeList = recordTypeList;
    intervalList = intervalList;
  }
</script>

<style lang="scss" scoped>
  // style 里有 scoped 就只能修改当前组件的样式；
  // 如果要修改导入组件 <Tags/> 的样式，需要在元素前加上 ::v-deep （注意后面有空格）；
  // 或者把 scoped 删掉，这样就会覆盖导入组件 <Tags/> 的样式
  ::v-deep .type-tabs-item {
    background: white;
    &.selected {
      background: #C4C4C4;
      &::after {
        display: none;
      }
    }
  }
  ::v-deep .interval-tabs-item {
    height: 48px;
  }
</style>