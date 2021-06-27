<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             :value="value" @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
      <!-- $event.target.value 表示获取输入的值 -->
    </label>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) fieldName!: string; // required: true 表示外部必须传一个值给 fieldName。! 表示忽略初始值
    @Prop() placeholder?: string; // ? 表示值可以不存在
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