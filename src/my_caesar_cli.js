const { pipeline } = require("stream");
const { promisify } = require("util");

const { readStream, writeStream, transformStream } = require("./streams");

// node src/index.js --action encode -s 7 -i "src/input.txt" -o "src/output.txt"

const pipelineAsync = promisify(pipeline);

(async () => {
  try {
    await pipelineAsync(readStream, transformStream, writeStream);
    process.stdout.write("Ok");
  } catch (err) {
    process.stderr.write("Ошибка:", err);
  }
})();
