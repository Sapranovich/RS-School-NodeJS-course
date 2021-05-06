const Stream = require("stream");
const fs = require("fs");

const shiftCaesar = require('./shiftCaesar');
const params = require('./params');

const readStream = params.input ? fs.createReadStream(params.input) : process.stdin;
const writeStream = params.output ? fs.createWriteStream(params.output) : process.stdout;

const transformStream = new Stream.Transform({
  transform(chunk, encoding, callback) {
    const transformText = shiftCaesar(chunk.toString(), params.shift);
    callback(null, transformText);
  },
});

module.exports = {readStream, transformStream, writeStream}