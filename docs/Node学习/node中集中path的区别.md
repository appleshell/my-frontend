---
title: node中集中path的区别
---

[Node.js的__dirname，__filename，process.cwd()，./的一些坑](https://github.com/jawil/blog/issues/18)

详细内容请阅读上面的文章，下面简单说一下结论：

- `__dirname`：返回的是当前执行文件所在目录的完整目录路径
- `__filename`：返回的是当前执行文件的完整路径，包括了当前文件的文件名和后缀
- `process.cwd()`：返回的是当前执行node命令时候的文件夹目录路径
- `./`：不使用require的时候，与process.cwd()相同，使用require的时候，与__dirname相同
