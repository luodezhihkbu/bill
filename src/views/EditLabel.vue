<template>
  <Layout>
    <Header>编辑类别</Header>
    <div class="form-wrapper">
      <FormItem :value.sync="currentTag.name" field-name="名称" placeholder="请输入类别名"/>
      <Icon name="delete2" @click="remove"></Icon>
    </div>
    <div class="button-wrapper">
      <Button @click="update(currentTag)">确定</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  import Header from '@/components/Header.vue';

  @Component({
    components: {Header, Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return (this.$store.state as RootState).currentTag;
    }
    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }
    update(currentTag: Tag) {
        if (currentTag.name.length > 4) {
          return window.alert('名称不能超过4个汉字');
        } else {
          console.log(currentTag);
          this.$store.commit('updateTag', currentTag);
        }
      }
    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-wrapper {
    background: white;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      margin-right: 16px;
      color: #eb4d3d;
    }
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>