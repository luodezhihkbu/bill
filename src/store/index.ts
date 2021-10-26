import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import defaultTagList from '@/constants/defaultTagList';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    tabsType: 'expense'
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      if (!record.tags.id) {
        return window.alert('请选择一个类别');
      }
      if (record.amount === 0) {
        return window.alert('请输入金额');
      }
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
      window.alert('已保存');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = defaultTagList;
        store.commit('saveTags');
      }
    },
    createTag(state, payload: { name: string; type: string; icon: string }) {
      const {name, type, icon} = payload;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('名称重复了');
      } else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name, type: type, icon: icon});
        store.commit('saveTags');
        window.alert('添加成功');
        router.back();
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      const tag = state.tagList.filter(t => t.id === id)[0];
      state.currentTag = clone(tag);
    },
    updateTag(state, tag: Tag) {
      const {id, name} = tag;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          for (let i = 0; i < state.recordList.length; i++) {
            if (state.recordList[i].tags.id === id) {
              state.recordList[i].tags.name = name;
              window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
            }
          }
          window.alert('编辑成功');
        }
      }
    },
    removeTag(state, id: string) {
      const {tagList} = state;
      const tagList1 = tagList.filter(t => t.type === 'expense');
      const tagList2 = tagList.filter(t => t.type === 'income');
      if (tagList1.length === 1 || tagList2.length === 1) {
        window.alert('至少要保留一个标签哦~');
        return;
      }
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          state.tagList.splice(i, 1);
          store.commit('saveTags');
          window.alert('删除成功');
          router.back();
          break;
        }
      }
    },
    setTabsType(state, tabsType: string) {
      state.tabsType = tabsType;
    }
  },
});
export default store;