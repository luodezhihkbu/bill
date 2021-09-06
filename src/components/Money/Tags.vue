<template>
  <ul class="iconList">
    <li v-for="tag in filteredList" :key="tag.id">
      <div class="icon-wrapper"
           :class="{selected: tag.icon === selectedTags.icon}" @click="select(tag)">
        <Icon :name="`${tag.icon}`"/>
        <span>{{ tag.name }}</span>
      </div>
    </li>
    <li>
      <router-link :to="`/labels/add/${type}`" class="icon-wrapper">
        <Icon name="add"/>
        <span>添加类别</span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop({required: true}) type!: string;
    selectedTags: Tag = {};
    created() {
      this.$store.commit('fetchTags');
    }
    get tagList() {
      return this.$store.state.tagList;
    }
    get filteredList() {
      const {tagList} = this;
      return tagList.filter(t => t.type === this.type);
    }
    select(tag) {
      this.selectedTags = tag;
      this.$emit('update:value', this.selectedTags);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .iconList {
    background: white;
    max-height: 60vh;
    overflow: auto;
    padding: 0 10px 10px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33333%;
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
        flex-direction: column;
        font-size: 13px;
        &.selected {
          border: 1px solid $color-theme;
          background: $color-theme;
        }
        .icon {
          width: 22px;
          height: 22px;
          margin-bottom: 2px;
        }
      }
    }
  }
</style>