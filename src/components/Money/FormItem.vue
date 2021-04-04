<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Watch, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    value = '';
    @Prop({required: true}) fieldName!: string; // required: true 表示外部必须传一个值给 fieldName。! 表示值可以为空值
    @Prop() placeholder?: string; // ? 表示值可以不存在
    @Watch('value')
    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 14px;
    display: flex;
    align-items: center;
    .name {
      padding: 0 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      border: none;
      background: transparent;
    }
  }
</style>