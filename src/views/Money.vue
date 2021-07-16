<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="SaveRecord"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>
    <Tags @update:value="onUpdateTags"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Vue, Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, FormItem, Tags, NumberPad}
  })
  export default class Money extends Vue {
    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };
    created() {
      this.$store.commit('fetchRecords');
    }
    onUpdateTags(value: Tag[]) {
      this.record.tags = value;
    }
    onUpdateAmount(value: number) {
      this.record.amount = value;
    }
    SaveRecord() {
      this.$store.commit('createRecord', this.record);
      this.record.notes = '';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    background: white;
    border-top: 1px solid #e6e6e6;
    padding: 12px 0;
  }
</style>