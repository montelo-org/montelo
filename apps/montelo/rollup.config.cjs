const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");
const replace = require("@rollup/plugin-replace");

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
      // Mistral: Replace node-fetch with cross-fetch/polyfill, to make it work w/ Vercel
      replace({
        preventAssignment: true,
        "node-fetch": "cross-fetch/polyfill",
      }),
      nodeResolve(),
      typescript(),
      commonjs(),
      json(),
    ],
  },
];
