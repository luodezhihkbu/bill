<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';
    inputContent(event: MouseEvent) { // event 为鼠标事件，会自动获取鼠标点击的内容
      const button = (event.target as HTMLButtonElement); // 把 button 强制作为 Button 元素
      const input = button.textContent!; // 获取点击的数字；！表示值不为 null
      if (this.output.length === 16) {
        return;
      }
      // 输入的数字默认以0开头，输入其他数字后，0被替换掉
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      // 已经输入一个"."后，不能再输入一个"."
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input;
    }
    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }
    clear() {
      this.output = '0';
    }
    ok() {
      const number = parseFloat(this.output); // 把 output 的类型转化成 Float 类型
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    .output {
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace; // 系统默认的编程字体
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }
    .buttons {
      @extend %clearFix;
      button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;
        &.ok {
          height: 64*2px;
          float: right;
        }
        &.zero {
          width: 25*2%;
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }
        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }
        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>