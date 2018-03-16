module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
    "react/no-unescaped-entities": [0],
    "react/prop-types": [1],
    "react/forbid-prop-types": [0],
    "global-require": [0],
    "import/no-dynamic-require": [0],
    "max-len": [2, 120, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }],
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  }
}
