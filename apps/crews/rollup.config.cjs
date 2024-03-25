const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");

/**
 * @type {import("rollup").RollupOptions[]}
 */
module.exports = [
  {
    input: "src/index.ts",
    output: {
      dir: "dist/bundle",
      format: "commonjs",
    },
    plugins: [
      nodeResolve(),
      typescript(),
      commonjs(),
      json(),
    ],
  }
];
