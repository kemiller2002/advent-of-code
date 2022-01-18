const fs = require("fs");

const process = (data) =>
  data
    .split("\n")
    .reduce(
      (p, c) => ({ current: c, count: p.count + (c > p.current ? 1 : 0) }),
      { current: 0, count: 0 }
    ).count;

function run(path) {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    const count = process(data);

    console.log(count);
  });
}

run(`${__dirname}/../input.txt`);
