type RecordItem = {
  tags: Tag;
  notes: string;
  amount: number;
  createdAt?: string;
}
type Tag = {
  id: string;
  name: string;
  type: string;
  icon: string;
}
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  tabsType: string;
}