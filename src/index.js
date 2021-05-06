const argv = require("minimist")(process.argv);
const { pipeline } = require("stream");
const Stream = require("stream");

const fs = require("fs");
const { promisify } = require("util");

const pipelineAsync = promisify(pipeline);

// node src/index.js --action encode -s 7 -i "src/input.txt" -o "src/output.txt"

const params = {
  shift: argv.s || argv.shift,
  input: argv.i || argv.input,
  output: argv.o || argv.output,
  action: argv.a || argv.action,
};

//  проверка на валидность shift и action

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

// ============== финкция  Caesar shift ==============
function caesarShift(text, shift) {
  if (shift < 0) {
    return caesarShift(text, shift + 26);
  }
  let resault = "";
  for (let i = 0; i < text.length; i++) {
    let letter = text[i];
    if (letter.match(/[a-z]/i)) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        letter = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        letter = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    resault += letter;
  }
  return resault;
}
// ===================================================

const readStream = params.input ? fs.createReadStream(params.input) : process.stdin;
const writeStream = params.output ? fs.createWriteStream(params.output) : process.stdout;

const transformStream = new Stream.Transform({
  transform(chunk, encoding, callback) {
    const transformText = caesarShift(chunk.toString(), params.shift);
    callback(null, transformText);
  },
});

(async () => {
  try {
    await pipelineAsync(readStream, transformStream, writeStream);
    console.log("Ok");
  } catch (err) {
    console.error("Error:", err);
  }
})();
