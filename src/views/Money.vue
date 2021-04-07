<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="SaveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
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
    get recordList() {
      return this.$store.state.recordList;
    }
    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: '0'
    };
    created() {
      this.$store.commit('fetchRecords');
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateAmount(value: string) {
      this.record.amount = value;
    }
    SaveRecord() {
      this.$store.commit('createRecord', this.record);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>