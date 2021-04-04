<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: {id: string; name: string} = undefined;
    created() {
      const id = this.$route.params.id; // 获取路由 '/labels/edit/:id' 中的 id 的值
      // 获取已存储的标签数据。如果路由的 id 在数据中已存在，则根据 id 路由到对应的标签；如果不存在，则路由到 404
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(item => item.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftIcon {
      width: 24px;
      height: 24px;
    }
    .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper{
    background: white;
    margin-top: 8px;
  }
  .button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>