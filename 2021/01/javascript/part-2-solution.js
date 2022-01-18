const fs = require("fs");

function getSumOfThree(data, indexer) {
  if (indexer + 2 >= data.length) {
    return 0;
  }

  return data[indexer] + data[indexer + 1] + data[indexer + 2];
}

const process = (data) =>
  data
    .map((x) => parseInt(x))
    .map((e, i, a) => getSumOfThree(a, i))
    .reduce(
      (s, i) => ({
        previous: i,
        count: s.count + (i > s.previous && s.previous ? 1 : 0),
      }),
      { previous: undefined, count: 0 }
    );

function run(path) {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    const count = process(data.split("\n"));

    console.log(count);
  });
}

function testCode() {
  const count = process("199,200,208,210,200,207,240,269,260,263".split(","));

  console.log(count);
}
//testCode();
run(`${__dirname}/../input.txt`);
