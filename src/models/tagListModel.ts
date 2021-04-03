const localStorageKeyName = 'tagList';
type TagListModel = {
  data: string[];
  fetch: () => string[]; // 箭头前的括号表示函数输入值，有参数则加上参数；箭头后表示函数返回值的类型。
  create: (name: string) => 'success' | 'duplicated'; // 联合类型：表示返回的类型只有"success"和"duplicated"这两种
  save: () => void; // void 表示没有返回值
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push(name);
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;