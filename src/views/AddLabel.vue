<template>
  <Layout>
    <Header>添加类别</Header>
    <div class="form-wrapper">
      <FormItem :value.sync="tag.name" field-name="名称"
                placeholder="请输入类别名称（不超过4个汉字）"/>
    </div>
    <div class="title">图标</div>
    <ul class="iconList">
      <li v-for="icon in iconList" :key="icon.id">
        <div class="icon-wrapper"
             :class="{selected: icon === tag.icon}" @click="select(icon)">
          <Icon :name="`${icon}`"/>
        </div>
      </li>
    </ul>
    <div class="button-wrapper">
      <Button @click="createTag(tag)">确定</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import Header from '@/components/Header.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import iconList from '@/constants/iconList';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
    components: {Button, FormItem, Tabs, Header}
  })
  export default class AddLabel extends mixins(TagHelper) {
    iconList = iconList;
    tag = {name: '', type: '', icon: 'bonus'};
    created() {
      this.tag.type = this.$route.params.type;
    }
    select(icon: string) {
      this.tag.icon = icon;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  ::v-deep .content {
    display: flex;
    flex-direction: column;
  }
  .form-wrapper {
    background: white;
    border-bottom: 1px solid #e6e6e6;
  }
  .title {
    background: white;
    font-size: 14px;
    padding: 10px 16px;
  }
  .iconList {
    background: white;
    padding: 0 10px;
    flex-grow: 1;
    overflow: auto;
    max-height: 40vh;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-wrapper {
        border: 1px solid lightgray;
        margin-bottom: 10px;
        border-radius: 10px;
        width: 80%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.selected {
          border: 1px solid $color-theme;
          background: $color-theme;
        }
        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .button-wrapper {
    text-align: center;
    padding: 50px;
  }
</style>