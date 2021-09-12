<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove" class="remove"><Icon name="delete"/></button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear" class="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">确定</button>
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
    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) {
        return;
      }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
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
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    flex-shrink: 0;
    .output {
      border-top: 1px solid #e6e6e6;
      font-size: 30px;
      font-family: Consolas, monospace; // 系统默认的编程字体
      padding: 0 10px;
      text-align: right;
      height: 50px;
      line-height: 49px;
    }
    .buttons {
      @extend %clearFix;
      button {
        width: 25%;
        height: 50px;
        float: left;
        background: transparent;
        border-bottom: none;
        border-left: none;
        border-top: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        &.remove {
          border-right: none;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 24px;
            height: 24px;
          }
        }
        &.clear {
          border-right: none;
        }
        &.ok {
          height: 100px;
          float: right;
          background: $color-theme;
          border-right: none;
        }
        &.zero {
          width: 25*2%;
        }
      }
    }
  }
</style>