<template>
  <ul class="tabs">
    <!-- class 和带冒号的 class 可以同时使用，但不能同时使用两个 class 或两个带冒号的 class -->
    <li v-for="item in DataSource" :key="item.value"
        class="tabs-item" :class="liClass(item)"
        @click="select(item)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string; value: string }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) DataSource!: DataSourceItem[];
    @Prop(String) classPrefix?: string;
    @Prop(String) readonly value!: string; // ! 表示忽略 value 没有初始值
    // 给 li 加上类名，冒号后面的为 True ，则返回冒号前的类名
    liClass(item: DataSourceItem) {
      return {
        // 在类名前加上 classPrefix 是为了区分 Statistics.vue 和 Money.vue 引用的 <Tabs/> 组件里的 li；
        // 类名里含变量要用 []
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value
      };
    }
    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;
    // 这里的类名不能用 .tabs-item 或 li ，而是用 &-item ；
    // 因为给多个类名加样式比给单个类名加样式的优先级更高；
    // 如果用 .tabs-item 或 li ，相当于给两个类名加样式，这样外部组件 Statistic 的样式就不能覆盖此组件的样式
    &-item {
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