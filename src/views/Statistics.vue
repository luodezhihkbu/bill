<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    {{ result }}
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
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    get recordList() {
      return (this.$store.state as RootState).recordList; // 这里要强制声明 RootState 类型
    }
    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string; items: RecordItem[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        // [date, time] 表示数组的解构赋值：从数组中提取值，按照对应位置，对变量赋值。
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }
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