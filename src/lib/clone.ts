function clone<x>(data: x): x { // <x>(data: x): x 表示该函数传入参数的类型和返回值的类型一样，x 可以为任意值
  return JSON.parse(JSON.stringify(data));
}
export default clone;