const fs = require("fs");
const path = require("path");

const docsUrl = "./docs";
const docsDir = fs.readdirSync(docsUrl);
const sideBar = {};

docsDir.forEach((item) => {
  const docGroup = fs.readdirSync(path.join(docsUrl, item));
  sideBar[item] = docGroup.map((i) => {
    const stas = fs.lstatSync(path.join(docsUrl, item, i));
    if (stas.isDirectory()) {
      const docGroup = fs.readdirSync(path.join(docsUrl, item, i));
      return {
        [i]: docGroup.map(
          (j) =>
            `${item}/${i}/${path.basename(
              path.join(docsUrl, item, i, j),
              ".md"
            )}`
        ),
      };
    }
    return `${item}/${path.basename(path.join(docsUrl, item, i), ".md")}`;
  });
});

module.exports = {
  someSidebar: sideBar,
};

// module.exports = {
//   someSidebar: [
//     "ttts",
//     { React: ["React/hooks", { blog: ["React/blog/learn"] }] },
//   ],
// };
