<template>
  <layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="SaveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Vue, Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import store from '@/store/index2';

  @Component({
    components: {FormItem, Tags, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = store.tagList; // 标签数据从 tagListModel 获取
    recordList = store.recordList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: '0'
    };
    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateAmount(value: string) {
      this.record.amount = value;
    }
    SaveRecord() {
      store.createRecord(this.record);
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