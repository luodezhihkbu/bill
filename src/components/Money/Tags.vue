<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{ tag.name }}
      </li>
      <!-- selected 的值为 ture 时，则给 <li> 绑定类名 selected -->
    </ul>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    computed: {
      tagList() {
        return this.$store.state.tagList;
      }
    }
  })
  export default class Tags extends Vue {
    selectedTags: string[] = [];
    // 如果标签没有被选中，点击后选中；如果标签已经选中，点击后取消选中
    created() {
      this.$store.commit('fetchTags');
    }
    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      // 选中或取消选中标签后，触发 update:value 事件，并将 selectedTags 的值传给 Money 组件 onUpdateTags 函数的第一个参数
      this.$emit('update:value', this.selectedTags);
    }
    create() {
      const name = window.prompt('请输入标签名'); // 点击"新增标签"，弹出输入对话框，并把输入的内容赋值给 name
      if (!name) {
        return window.alert('标签名不能为空');
      }
      this.$store.commit('createTag', name);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    .current {
      display: flex;
      flex-wrap: wrap;
      li {
        $bg: #d9d9d9;
        background: $bg;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        text-align: center;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected {
          background: darken($bg, 50%);
          color: white;
        }
      }
    }
    .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>