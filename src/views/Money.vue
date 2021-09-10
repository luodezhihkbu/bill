<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="SaveRecord"/>
    <div class="notes">
      <Icon name="notes"/>
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>
    <Tags :tabsType="tabsType" @update:value="onUpdateTags"/>
    <div class="bar"></div>
    <Tabs :data-source="recordTypeList"/>
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
      tags: {id: '', name: '', type: '', icon: ''}, notes: '', amount: 0
    };
    get tabsType() {
      return this.$store.state.tabsType;
    }
    created() {
      this.record.tags.type = this.tabsType;
    }
    onUpdateTags(value: Tag) {
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
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .bar {
    background: white;
    height: 20px;
  }
  .notes {
    background: white;
    border-top: 1px solid #e6e6e6;
    padding: 4px 0;
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
      margin-left: 15px;
      margin-right: -18px;
    }
  }
</style>