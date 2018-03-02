var jsonic = require('jsonic');
var { matchRecursive } = require('xregexp');

function json_from_text(raw_text, options) {
  if (!options) options = {};
  if (!options.parse_to_json) options.parse_to_json = true;
  if (!options.transform_function || !options.parse_to_json)
    options.transform_function = json_string => json_string;

  var raw_results = matchRecursive(raw_text, '[{\\[]', '[\\]}]', 'g', { valueNames: ['text', 'left', 'center', 'right'] });
  var text_results = [], json_results = [], full_results = [];

  for (var i = 0; i < raw_results.length; i++) {
    if (raw_results[i].name == 'left') {
      var json_string = options.transform_function(raw_results[i].value + raw_results[i + 1].value + raw_results[i + 2].value);
      var json_object = !!options.parse_to_json ? jsonic(json_string) : json_string;
      json_results.push(json_object);
      full_results.push({ type: 'json', value: json_object });
      i += 2;
    } else {
      var text = raw_results[i].value;
      text_results.push(text);
      full_results.push({ type: 'text', value: text });
    }
  }

  return { text_results, json_results, full_results };
}

module.exports = json_from_text;


var sample_text = "There was a change from {'animal':'dog', 'color':'blue'} to {'animal':'cat', 'color':'red'}'";
var results = json_from_text(sample_text);
console.log(JSON.stringify(results, null, 2));