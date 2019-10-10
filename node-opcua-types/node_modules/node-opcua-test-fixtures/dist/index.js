"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function getFixture(relativeName) {
    const filename = path.join(__dirname, "..", relativeName);
    return filename;
}
exports.getFixture = getFixture;
//# sourceMappingURL=index.js.map