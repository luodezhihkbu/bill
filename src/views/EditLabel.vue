<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" field-name="标签名" placeholder="请输入标签名"
                @update:value="update"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    // 数据如果放在 computed 里，export 里就访问不到数据，所以需要改成 get 来获取数据
    get currentTag() {
      return this.$store.state.currentTag;
    }
    // 获取路由 '/labels/edit/:id' 中的 id 的值
    // 接着执行 fetchTags 获取 tagList 数据
    // 如果 id 在 tagList 数据中已存在，则根据 id 路由到对应的标签；如果不存在，则路由到 404
    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }
    update(name: string) {
      if (this.currentTag) {
        this.$store.commit('updateTag', {id: this.currentTag.id, name: name});
      }
    }
    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }
    goBack() {
      this.$router.back();
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
  .form-wrapper {
    background: white;
    margin-top: 8px;
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>