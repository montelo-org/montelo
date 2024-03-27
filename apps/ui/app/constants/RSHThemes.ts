export const RSHTheme = {
  'code[class*="language-"]': {
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    color: "#eee",
    background: "#000",
    borderRadius: "10px",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "0.9em",
    lineHeight: "1.25em",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    color: "#eee",
    background: "#000",
    border: "1px solid #222",
    borderRadius: "10px",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "1em",
    lineHeight: "1.5em",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    overflow: "auto",
    position: "relative",
    margin: "0.5em 0",
    padding: "0.9em 0.75em",
  },
  'code[class*="language-"]::-moz-selection': {
    background: "#363636",
  },
  'pre[class*="language-"]::-moz-selection': {
    background: "#363636",
  },
  'code[class*="language-"] ::-moz-selection': {
    background: "#363636",
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: "#363636",
  },
  'code[class*="language-"]::selection': {
    background: "#363636",
  },
  'pre[class*="language-"]::selection': {
    background: "#363636",
  },
  'code[class*="language-"] ::selection': {
    background: "#363636",
  },
  'pre[class*="language-"] ::selection': {
    background: "#363636",
  },
  ':not(pre) > code[class*="language-"]': {
    whiteSpace: "normal",
    borderRadius: "0.2em",
    padding: "0.1em",
  },
  ".language-css > code": {
    color: "#fd9170",
  },
  ".language-sass > code": {
    color: "#fd9170",
  },
  ".language-scss > code": {
    color: "#fd9170",
  },
  '[class*="language-"] .namespace': {
    opacity: "0.7",
  },
  atrule: {
    color: "#9cd2bb",
  },
  "attr-name": {
    color: "#ffcb6b",
  },
  "attr-value": {
    color: "#a5e844",
  },
  attribute: {
    color: "#a5e844",
  },
  boolean: {
    color: "#9cd2bb",
  },
  builtin: {
    color: "#ffcb6b",
  },
  cdata: {
    color: "#80cbc4",
  },
  char: {
    color: "#80cbc4",
  },
  class: {
    color: "#ffcb6b",
  },
  "class-name": {
    color: "#bbd760",
  },
  comment: {
    color: "#616161",
  },
  constant: {
    color: "#9cd2bb",
  },
  deleted: {
    color: "#ff6666",
  },
  doctype: {
    color: "#616161",
  },
  entity: {
    color: "#ff6666",
  },
  function: {
    color: "#bbd760",
  },
  hexcode: {
    color: "#f2ff00",
  },
  id: {
    color: "#9cd2bb",
    fontWeight: "bold",
  },
  important: {
    color: "#9cd2bb",
    fontWeight: "bold",
  },
  inserted: {
    color: "#80cbc4",
  },
  keyword: {
    color: "#fd6479",
  },
  number: {
    color: "#fd9170",
  },
  operator: {
    color: "#fd6479",
  },
  prolog: {
    color: "#616161",
  },
  property: {
    color: "#80cbc4",
  },
  "pseudo-class": {
    color: "#edc052",
  },
  "pseudo-element": {
    color: "#edc052",
  },
  punctuation: {
    color: "#fd6479",
  },
  regex: {
    color: "#f2ff00",
  },
  selector: {
    color: "#ff6666",
  },
  string: {
    color: "#ffd66d",
  },
  symbol: {
    color: "#c792ea",
  },
  tag: {
    color: "#ff6666",
  },
  unit: {
    color: "#fd9170",
  },
  url: {
    color: "#ff6666",
  },
  variable: {
    color: "#ff6666",
  },
} as const;
