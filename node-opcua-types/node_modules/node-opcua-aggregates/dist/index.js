"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module node-opca-aggregates
 */
var aggregates_1 = require("./aggregates");
exports.addAggregateSupport = aggregates_1.addAggregateSupport;
exports.installAggregateConfigurationOptions = aggregates_1.installAggregateConfigurationOptions;
exports.getAggregateConfiguration = aggregates_1.getAggregateConfiguration;
__export(require("./interpolate"));
__export(require("./minmax"));
__export(require("./interval"));
__export(require("./common"));
//# sourceMappingURL=index.js.map