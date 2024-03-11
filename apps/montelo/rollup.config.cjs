const resolve = require("@rollup/plugin-node-resolve").nodeResolve;
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
      dir: "dist/bundle.js",
      format: "commonjs",
    },
    plugins: [
      resolve(),
      typescript(),
      commonjs(),
      json(),
    ],
  },
  // Separate configuration for the CLI script
  {
    input: "../../packages/cli/src/cli.ts",
    output: {
      file: "dist/cli.js",
      format: "commonjs",
    },
    plugins: [typescript()],
  },
];
