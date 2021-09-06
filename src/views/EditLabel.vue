<template>
  <Layout>
    <Header>编辑标签</Header>
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
  import Header from '@/components/Header.vue';

  @Component({
    components: {Header, Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }
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
  }
</script>

<style lang="scss" scoped>
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