<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol v-if="groupedList.length>0">
      <li v-for="group in groupedList" :key="group.title">
        <h3 class="title">
          <span>{{ beautify(group.title) }}</span>
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <!-- 列表渲染数组，默认用 id 作为 key；如果数组里的值是对象，可以用对象的键名作为 key -->
            <!-- 如果是列表渲染对象，第一个参数是对象的值（value），第二个参数是对象的键名（name），第三个参数是 index，
             用键名或 index 作为 key -->
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    recordTypeList = recordTypeList;
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    get recordList() {
      return (this.$store.state as RootState).recordList;
      // 这里要强制声明 state 的类型或者 recordList 的类型，否则返回的 recordLis 的类型为 any
    }
    // 对数据库存储的原始数据先排序再分组
    get groupedList() {
      const {recordList} = this;
      // 把原始数据按支出和收入分类，并分别对分类后的数据按创建时间排序
      const newList = clone(recordList) // sort 会改变原数组的值，需要先深拷贝
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        // 对数组进行排序，大的值排在前面
        // 用 dayjs 把数据库储存的时间解析成本地时间（中国时间），再用 valueOf() 把字符串类型的时间转化成数字类型
      if (newList.length === 0) {
        return [];
      }
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      // 先把 newList 的第一项放进 result 的 items 里，并用创建时间作为 title 的值，从 newList 的第二项开始遍历；
      // 如果某项对应的 title 的值和它上一项对应的 title 的值相等，则把这一项 push 到"上一项的 items 里"；
      // 如果不相等，则把这一项 push 到" result 里"，同时用创建时间作为 title 的值
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      // 分完组后按天计算每天的总金额
      result.forEach(group => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
      return result;
    }
    // 把数组类型的 tags 转化成字符串类型，并用", "分隔
    tagString(tags: Tag[]) {
      return tags.map(t => t.name).join('，');
    }
    beautify(string: string) {
      const day = dayjs(string); // 把数据库存储的时间解析成本地时间（中国时间）
      const now = dayjs(); // 获取当前时间
      if (day.isSame(now, 'day')) {
        return '今天'; // 如果存储时间和当前时间的"天"相等，则返回"今天"
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天'; // 把当前时间减"1天"，即昨天同一时刻的时间，如果存储时间和昨天时间的"天"相等，则返回"昨天"
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日'); // 如果存储时间和当前时间的"年"相等，则返回"M月D日"格式的日期
      } else {
        return day.format('YYYY年M月D日');
      }
    }
  }
</script>

<style lang="scss" scoped>
  // style 里有 scoped 就只能修改当前组件的样式；
  // 如果要覆盖导入的组件 <Tabs/> 本身的样式，需要用 classPrefix 加上类名；
  // 并且使用 ::v-deep （注意后面有空格）
  //::v-deep .type-tabs-item {
  //  background: #C4C4C4;
  //  &.selected {
  //    background: #f9d961;
  //    &::after {
  //      display: none;
  //    }
  //  }
  //}
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
  .noResult {
    padding: 16px;
    text-align: center;
  }
</style>