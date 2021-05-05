const argv = require("minimist")(process.argv);

const params = {
  shift: argv.s || argv.shift,
  input: argv.i || argv.input,
  output: argv.o || argv.output,
  action: argv.a || argv.action,
};

console.log(params)
