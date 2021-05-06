const argv = require("minimist")(process.argv);

const params = {
    shift: argv.s || argv.shift,
    input: argv.i || argv.input,
    output: argv.o || argv.output,
    action: argv.a || argv.action,
  };
  
  process.stdout.write("Привет! Это реализация задания онлайн курса «Разработка на Node.js» - Caesar cipher CLI tool \n");
  
  if (!params.shift) {
    process.stderr.write("Наличие параметра shift обязателено. Попробуйте еще!");
    process.exit(1);
  }
  
  if (params.action !== "encode" && params.action !== "decode") {
    process.stderr.write("Наличие параметра action(encode/decode) обязателено. Попробуйте еще!");
    process.exit(1);
  }
  
  if (params.action === "decode") params.shift = -params.shift;


  module.exports = params;