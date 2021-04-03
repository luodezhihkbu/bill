const localStorageKeyName = 'recordList';
const recordListModel = {
  clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
export default recordListModel;