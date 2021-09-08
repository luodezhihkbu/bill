import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
  createTag(tag: { name: string; type: string; icon: string }) {
    if (!tag.name) {
      return window.alert('名称不能为空');
    }
    if (tag.name.length > 4) {
      return window.alert('名称不能超过4个汉字');
    }
    this.$store.commit('createTag', tag);

  }
}
export default TagHelper;