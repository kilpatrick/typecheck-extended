module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jasmine"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "env": {
    "jasmine": true
  },
  "globals": {
    "fetch": true
  }
};
