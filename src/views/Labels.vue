<template>
  <layout>
    <ul class="tags">
      <li>
        <span>衣</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </layout>
</template>

<script lang="ts">
  export default {
    name: 'Labels'
  };
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding: 0 16px;
    li {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      .icon {
        width: 18px;
        height: 18px;
        color: #666;
      }
    }
  }
  .createTag {
    background: #767676;
    color: white;
    border: none;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>