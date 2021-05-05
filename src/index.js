const argv = require("minimist")(process.argv);
const { pipeline } = require("stream");
const Stream = require('stream');

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

const readStream = fs.createReadStream(params.input);
const writeStream = fs.createWriteStream(params.output);

const transformStream = new Stream.Transform({
	transform(chunk, encoding, callback) {
		const transformed = chunk.toString();
		callback(null, transformed);
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
