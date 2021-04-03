<template>
  <Layout>
    编辑标签
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  @Component
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id; // 获取路由 '/labels/edit/:id' 中的 id 的值
      // 获取已存储的标签数据。如果路由的 id 在数据中已存在，则根据 id 路由到对应的标签；如果不存在，则路由到 404
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(item => item.id === id)[0];
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>