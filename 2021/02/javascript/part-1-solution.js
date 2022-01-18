const path = require("path/posix");

function processMovement(entry) {
  switch (entry.move) {
    case "up":
      return {
        depth: -1 * entry.length,
      };
    case "forward":
      return {
        forward: entry.length,
      };
    case "down":
      return {
        depth: entry.length,
      };
  }
}

function process(entries) {
  let oEntries = entries
    .map((x) => x.split(" "))
    .map((x) => ({ move: x[0], length: parseInt(x[1], 10) }))
    .map((x) => processMovement(x))
    .reduce((s, i) => ({
      forward: (s.forward || 0) + (i.forward || 0),
      depth: (s.depth || 0) + (i.depth || 0),
    }));

  return oEntries.forward * oEntries.depth;
}

function run(path) {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    const count = process(data.split("\n"));

    console.log(count);
  });
}

function testCode() {
  const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split("\n");

  console.log(process(testData));
}

testCode();
run(`${__dirname}/../input.txt`);
