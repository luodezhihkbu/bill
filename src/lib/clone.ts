function clone<x>(data: x): x { // 三个 x 表示函数的输入值和输出值的类型一样，x 可以为任意值
  return JSON.parse(JSON.stringify(data));
}
export default clone;