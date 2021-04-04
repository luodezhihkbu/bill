const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default recordListModel;