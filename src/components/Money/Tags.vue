<template>
  <div class="scrollArea">
    <ul class="iconList">
      <li v-for="tag in filteredList" :key="tag.id">
        <div class="icon-wrapper"
             :class="{selected: tag.id === selectedTag.id}" @click="select(tag)">
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
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop({required: true}) type!: string;
    selectedTag: Tag = {id: '', name: '', type: '', icon: ''};
    created() {
      this.$store.commit('fetchTags');
    }
    get tagList() {
      return (this.$store.state as RootState).tagList;
    }
    get filteredList() {
      const {tagList} = this;
      return tagList.filter(t => t.type === this.type);
    }
    select(tag: Tag) {
      this.selectedTag = tag;
      this.$emit('update:value', this.selectedTag);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .scrollArea {
    flex: 1;
    overflow: auto;
    background: white;
    .iconList {
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      li {
        width: 33.33333%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-wrapper {
          border: 1px solid lightgray;
          margin-bottom: 10px;
          border-radius: 10px;
          width: 80%;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
  }
</style>