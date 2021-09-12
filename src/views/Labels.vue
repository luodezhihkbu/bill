<template>
  <Layout>
    <Tabs :data-source="recordTypeList"></Tabs>
    <div class="tags">
      <router-link class="tag" :class="{lastTag: tag === filteredList[filteredList.length-1]}"
                   :to="`/labels/edit/${tag.id}`" v-for="tag in filteredList" :key="tag.id">
        <Icon :name="`${tag.icon}`"/>
        <span class="name">{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <router-link :to="`/labels/add/${tabsType}`" class="createTag-wrapper">
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
    get tagList() {
      return (this.$store.state as RootState).tagList;
    }
    get filteredList() {
      const {tagList} = this;
      return tagList.filter(t => t.type === this.tabsType);
    }
    get tabsType() {
      return this.$store.state.tabsType;
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
    overflow: auto;
    font-size: 16px;
    padding: 0 16px;
    margin-bottom: auto;
    background: white;
    .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      .name {
        flex-grow: 1;
        padding-left: 6px;
      }
      .icon {
        width: 18px;
        height: 18px;
        color: #666;
      }
    }
    .lastTag {
      border-bottom: 1px solid white;
    }
  }
  .createTag-wrapper {
    text-align: center;
    margin: 50px auto;
  }
</style>