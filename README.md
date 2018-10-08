# json-from-text

![NPM Version](https://img.shields.io/npm/v/json-from-text.svg)
[![Build Status](https://travis-ci.org/tejashah88/json-from-text.svg?branch=master)](https://travis-ci.org/tejashah88/json-from-text)
[![Coverage Status](https://coveralls.io/repos/github/tejashah88/json-from-text/badge.svg)](https://coveralls.io/github/tejashah88/json-from-text)
[![dependencies Status](https://david-dm.org/tejashah88/json-from-text/status.svg)](https://david-dm.org/tejashah88/json-from-text)

An algorithm for separating embedded JSON from a string, nicely packaged into an NPM module.

## Upgrading from < 1.0
If you are upgrading from < 1.0, please see [UPGRADING](UPGRADING.md) for migration instructions.

## Usage
```javascript
Object jsonFromText(String mixedStr, Boolean parseToObject)
```

### Parameters:
* `mixedStr`: The string to separate the JSON from the text.
* `parseToObject`: If set to `false`, the resulting JSON strings will not be translated to JSON objects. Default is `true`.

## Example
### Input
```javascript
var jsonFromText = require('json-from-text');
var sampleText = "There was a change from {'animal':'dog', 'color':'blue'} to {'animal':'cat', 'color':'red'}'";
var results = jsonFromText(sampleText);
console.log(JSON.stringify(results, null, 2));
```

### Output:
```json
{
  "textResults": [
    "There was a change from '",
    "' to '",
    "'"
  ],
  "jsonResults": [
    {
      "animal": "dog",
      "color": "blue"
    },
    {
      "animal": "cat",
      "color": "red"
    }
  ],
  "fullResults": [
    {
      "type": "text",
      "value": "There was a change from '"
    },
    {
      "type": "json",
      "value": {
        "animal": "dog",
        "color": "blue"
      }
    },
    {
      "type": "text",
      "value": "' to '"
    },
    {
      "type": "json",
      "value": {
        "animal": "cat",
        "color": "red"
      }
    },
    {
      "type": "text",
      "value": "'"
    }
  ]
}
```

## Mentions
* [rjrodger](https://github.com/rjrodger) for his [jsonic](https://github.com/rjrodger/jsonic) module, which does lenient JSON parsing

## License
Copyright (c) 2017-2018 Tejas Shah

MIT License, see [LICENSE](LICENSE.md) for details.