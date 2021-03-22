<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" v-model="value" placeholder="在这里添加备注">
    </label>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    .name {
      padding: 0 16px;
    }
    input {
      height: 64px;
      flex-grow: 1;
      border: none;
      background: transparent;
    }
  }
</style>