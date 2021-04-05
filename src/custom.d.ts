// 声明一个全局的类型，文件名需要以 .d.ts 结尾
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: string;
  createdAt?: Date; // ? 表示这个属性可以不存在
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[]; // 箭头前的括号表示函数输入值，有参数则加上参数；箭头后表示函数返回值的类型
  create: (name: string) => 'success' | 'duplicated'; // 联合类型：表示返回的类型只有"success"和"duplicated"这两种
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void; // void 表示没有返回值
}