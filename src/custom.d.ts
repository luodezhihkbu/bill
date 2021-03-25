// 声明一个全局的类型，文件名需要以 .d.ts 结尾
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: string;
  createAT?: Date; // ? 表示这个属性可以不存在
}