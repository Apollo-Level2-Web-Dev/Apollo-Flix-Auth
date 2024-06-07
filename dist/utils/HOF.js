"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
const calculator = (calc) => {
    const dynamicCalulcator = (a, b) => {
        const value = calc(a, b);
        console.log(value);
    };
    return dynamicCalulcator;
};
const myCalculator = calculator((a, b) => a % b); // dynamicCalulcator
console.log(myCalculator(1, 2));
