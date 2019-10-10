"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("./lorem_ipsum");
function make_lorem_ipsum_buffer() {
    return Buffer.from(lorem_ipsum_1.loremIpsum);
}
exports.make_lorem_ipsum_buffer = make_lorem_ipsum_buffer;
function make_simple_buffer(chunkSize) {
    // feed chunk-manager on byte at a time
    const n = (chunkSize) * 4 + 12;
    const buf = Buffer.allocUnsafe(n);
    for (let i = 0; i < n; i += 1) {
        buf.writeUInt8(i % 256, i);
    }
    return buf;
}
exports.make_simple_buffer = make_simple_buffer;
//# sourceMappingURL=make_lorem_ipsum_buffer.js.map