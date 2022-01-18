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

function calculateAim(currentAim, entry) {
  const { forward = 0, depth = 0 } = entry;
  const aim = currentAim || 0;
  console.log(forward);

  if (forward) {
    return aim * forward;
  }

  return aim + depth;
}

/*function calculatePosition(state, item) {
  const val = (v) => v || 0;

  const newDepth = val(item.depth);
  const newForward = val(item.forward);
  const newAim = val(item.forward);

  return {
    depth: state.depth + newDepth,
    forward: newForward,
    aim: state.aim + newDepth,
  };
}*/

function calculateDepth(state, item) {
  return {
    //depth: state.depth + item.depth,
    aim: state.aim + item.depth,
  };
}

function horizontalForward(state, item) {
  return {
    forward: state.forward + item.forward,
  };
}

function horizontalDepth(state, item) {
  return {
    depth: state.aim * item.forward + state.depth,
  };
}

function wrapAction(fn) {
  return (s, i) => {
    const val = fn(s, i);
    return {
      forward: val.forward || s.forward || 0,
      depth: val.depth || s.depth || 0,
      aim: val.aim || s.aim || 0,
    };
  };
}

const horizotonalActions = [horizontalForward, horizontalDepth];
const depthActions = [calculateDepth];

const updateActions = [...horizotonalActions, ...depthActions].map((x) =>
  wrapAction(x)
);

function calculatePosition(state, item) {
  const val = updateActions.reduce((s, i) => i(s, item), state);
  return val;
}

function process(entries) {
  let oEntries = entries
    .map((x) => x.split(" "))
    .map((x) => ({ move: x[0], length: parseInt(x[1], 10) }))
    .map((x) => processMovement(x))
    .reduce((s, i) => calculatePosition(s, i), {
      depth: 0,
      forward: 0,
      aim: 0,
    });

  return oEntries;
}

function calculateFinalOutput(item) {
  return item.forward * item.depth;
}

function run(path) {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    const final = process(data.split("\n"));

    console.log(calculateFinalOutput(final));
  });
}

function testCode() {
  const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split("\n");

  const final = process(testData);

  console.log(calculateFinalOutput(final));
}

testCode();
run(`${__dirname}/../input.txt`);
