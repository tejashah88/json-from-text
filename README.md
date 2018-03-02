# json-from-text

![NPM Version](https://img.shields.io/npm/v/json-from-text.svg)

An algorithm for separating embedded JSON from a string, nicely packaged into a node.js module.

## Usage
```javascript
Object json_from_text(String json_string, Object options)
```

### Parameters:
* `json_string`: The string to parse the JSON from the text.
* `options.parse_to_json`: If set to false, the resulting JSON strings will not be translated to JSON objects. Default is `true`.
* `options.transform_function`: If specified, this function transforms all individual JSON strings discovered before parsing. This is ignored if `options.parse_to_json` is set to `false`.

Syntax of `options.transform_function`
```javascript
options.transform_function = function(old_json_string) {
  var new_json_string;
  // do transformations here
  return new_json_string;
}
```

Note that the actual parsing of the JSON is done thanks to [jsonic](https://github.com/rjrodger/jsonic), which allows the structure of the JSON in question to be more lenient (i.e. fields don't need quotes, single quotes allowed, trailing commas, etc.).

## Example
### Input
```javascript
var json_from_text = require('json-from-text');
var sample_text = "There was a change from {'animal':'dog', 'color':'blue'} to {'animal':'cat', 'color':'red'}'";
var results = json_from_text(sample_text);
console.log(JSON.stringify(results, null, 2));
```

### Output:
```bash
{
  "text_results": [
    "There was a change from ",
    " to "
  ],
  "json_results": [
    {
      "animal": "dog",
      "color": "blue"
    },
    {
      "animal": "cat",
      "color": "red"
    }
  ],
  "full_results": [
    {
      "type": "text",
      "value": "There was a change from "
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
      "value": " to "
    },
    {
      "type": "json",
      "value": {
        "animal": "cat",
        "color": "red"
      }
    }
  ]
}
```
