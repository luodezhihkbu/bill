<template>
  <ul class="tabs">
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
    @Prop(String) readonly value!: string;
    liClass(item: DataSourceItem) {
      return {
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
  @import "~@/assets/style/helper.scss";
  .tabs {
    background: $color-theme;
    display: flex;
    font-size: 22px;
    &-item {
      width: 50%;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 25%;
        width: 50%;
        height: 4px;
        background: #333333;
      }
    }
  }
</style>