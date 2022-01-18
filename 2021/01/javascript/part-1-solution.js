const fs = require("fs");

function process(data) {
  const entries = data.split("\n");

  let counter = 0;
  let previous = 0;

  for (let ii = 0; ii < entries.length; ii++) {
    let current = entries[ii];

    counter += current > previous ? 1 : 0;
    previous = current;
  }

  return counter;
}

function run(path) {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    const count = process(data);

    console.log(count);
  });
}
run(`${__dirname}/../input.txt`);
