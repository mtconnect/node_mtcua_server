"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***
 * @module node-opcua-benchmarker
 */
// tslint:disable:object-literal-shorthand
/// <reference types="node" />
const events_1 = require("events");
const _ = require("underscore");
const node_opcua_assert_1 = require("node-opcua-assert");
function measure_cycle(func) {
    const start = process.hrtime(); // tuple [second, nanosecond]
    func();
    const elapsed = process.hrtime(start);
    return elapsed[0] + elapsed[1] / 1000000000;
}
class Benchmarker extends events_1.EventEmitter {
    constructor() {
        super();
        /**
         * the speed up factor indicates how much faster is the faster ITestRun compare to the slowest.
         */
        this.speedUp = 0;
        this.suites = {};
    }
    /**
     * Add a new test to the suite
     * @param name name of the tests
     * @param func the code that need to be stress
     */
    add(name, func) {
        node_opcua_assert_1.assert(_.isFunction(func));
        this.suites[name] = {
            functor: func,
            name: name,
        };
        return this;
    }
    /**
     * run the benchmark
     * @param options
     */
    run(options) {
        options = options || {};
        options.max_time = !options.max_time ? 0.5 : options.max_time;
        options.min_count = options.min_count || 5;
        _.each(this.suites, (test) => {
            test.result = this.measure_perf(test.name, test.functor, options);
        });
        // find fastest
        this.fastest = _.max(this.suites, (bench) => {
            return bench.result.ops;
        });
        this.slowest = _.min(this.suites, (bench) => {
            return bench.result.ops;
        });
        this.speedUp = Math.floor(this.fastest.result.ops / this.slowest.result.ops);
        this.emit("complete");
        return this;
    }
    /**
     *
     * @param name
     * @param func
     * @param options
     * @internal
     */
    measure_perf(name, func, options) {
        node_opcua_assert_1.assert(_.isFunction(func));
        let totalTime = 0;
        let count = 0;
        const maxTime = !options.max_time ? 0.5 : options.max_time;
        const minCount = options.min_count || 5;
        while (totalTime < maxTime || count < minCount) {
            totalTime += measure_cycle(func);
            count += 1;
        }
        const ops = count / totalTime;
        const message = " CYCLE " + name + " op/s " + ((count / totalTime).toPrecision(7) + " count = " + count);
        this.emit("cycle", message);
        return {
            count: count,
            message: message,
            ops: ops,
            total_time: totalTime,
        };
    }
}
exports.Benchmarker = Benchmarker;
//# sourceMappingURL=benchmarker.js.map