const model = {
  fetch() {
    return JSON.parse(window.localStorage.getItem('recordList') || '[]')
  },
  save(data) {
    window.localStorage.setItem('recordList', JSON.stringify(data))
  }
}

export default model