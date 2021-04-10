<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group, name) in result" :key="name">
        <!-- 列表渲染对象，第一个参数是对象的值（value），第二个参数是对象的键名（name），第三个参数是 index，
        用键名或 index 作为 key -->
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <!-- 列表渲染数组，默认用 id 作为 key；如果数组里的值是对象，可以用对象的键名作为 key -->
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
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
    // 把 数组类型的 tags 转化成字符串类型
    tagString(tags: string[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }
  }
</script>

<style lang="scss" scoped>
  // style 里有 scoped 就只能修改当前组件的样式；
  // 如果要修改导入组件 <Tabs/> 的样式，需要在元素前加上 ::v-deep （注意后面有空格）；
  // 或者把 scoped 删掉，这样就会覆盖导入组件 <Tabs/> 的样式
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
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>