/// <reference types="node" />
/***
 * @module node-opcua-benchmarker
 */
import { EventEmitter } from "events";
export interface IPerformanceData {
    message: string;
    ops: number;
    count: number;
    total_time: number;
}
export interface IRunOptions {
    /**
     * max execution time in sec : default to 0.5 seconds.
     */
    max_time?: number;
    /**
     * specify the minimum number of time the benchmark-ed test cycle should be repeated
     */
    min_count?: number;
}
export interface ITestRun {
    name: string;
    functor: () => void;
    result?: IPerformanceData;
}
export interface IBenchmarkerEvent {
    on(event: "completed", listener: () => void): this;
    on(event: "cycle", listener: (message: string) => void): this;
}
export declare class Benchmarker extends EventEmitter implements IBenchmarkerEvent {
    /**
     * access the fastest test run
     */
    fastest?: ITestRun;
    /**
     * access the slowest test run
     */
    slowest?: ITestRun;
    /**
     * the speed up factor indicates how much faster is the faster ITestRun compare to the slowest.
     */
    speedUp: number;
    /***
     * @internal
     */
    private readonly suites;
    constructor();
    /**
     * Add a new test to the suite
     * @param name name of the tests
     * @param func the code that need to be stress
     */
    add(name: string, func: () => void): Benchmarker;
    /**
     * run the benchmark
     * @param options
     */
    run(options?: IRunOptions): this;
    /**
     *
     * @param name
     * @param func
     * @param options
     * @internal
     */
    private measure_perf;
}
