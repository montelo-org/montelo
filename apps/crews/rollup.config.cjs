const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");
const nodePolyfills = require('rollup-plugin-node-polyfills');

/**
 * @type {import("rollup").RollupOptions[]}
 */
module.exports = [
  {
    input: "src/index.ts",
    output: {
      dir: "dist/bundle-node",
      format: "commonjs",
    },
    plugins: [
      nodeResolve(),
      typescript(),
      commonjs(),
      json(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist/bundle-browser",
      format: "commonjs",
    },
    plugins: [
      nodeResolve({
        browser: true,
        modulesOnly: true,
      }),
      typescript(),
      commonjs(),
      json(),
      nodePolyfills()
    ],
  },
];
