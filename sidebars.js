const fs = require('fs')
const path = require('path')

const docsUrl = './docs'
const docsDir = fs.readdirSync(docsUrl)
const sideBar = {}
docsDir.forEach(item => {
  const docGroup = fs.readdirSync(path.join(docsUrl, item))
  sideBar[item] = docGroup.map(i => `${item}/${path.basename(path.join(docsUrl, item, i), '.md')}`)
})

module.exports = {
  someSidebar: sideBar
}

// module.exports = {
//   someSidebar: {
//     HTML: ["html/html-tag"],
//     CSS: ["CSS/css-layout", "CSS/css选择器"],
//     Javascript: ["JS/data-type"],
//     Typescript: ["TS/type-interface"],
//     React: ["React/lifecycle"],
//     网络: ["JS/data-type"],
//     前端工程化: ["JS/data-type"],
//     数据可视化: ["JS/data-type"],
//     数据结构和算法: ["JS/data-type"],
//     Git: ["JS/data-type"],
//     编程题: ["JS/data-type"],
//   },
// };
