<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type"></Tabs>
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in filteredList" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <router-link :to="`/labels/add/${type}`" class="createTag-wrapper">
      <Button>添加类别</Button>
    </router-link>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Button, Tabs}
  })
  export default class Labels extends Vue {
    recordTypeList = recordTypeList;
    type = 'expense';
    get tagList() {
      return (this.$store.state as RootState).tagList;
    }
    get filteredList() {
      const {tagList} = this;
      return tagList.filter(t => t.type === this.type);
    }
    created() {
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .content {
    display: flex;
    flex-direction: column;
  }
  .tags {
    flex-grow: 1;
    overflow: auto;
    font-size: 16px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -16px;
      width: 100%;
      height: 1px;
      background: white;
    }
    .tag {
      background: white;
      padding: 0 16px;
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
  .createTag-wrapper {
    text-align: center;
    padding: 50px;
  }
</style>