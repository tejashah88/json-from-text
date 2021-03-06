'use strict';

const jsonic = require('jsonic');
const matchRecursive = require('xregexp').matchRecursive;

function jsonFromText(mixedStr, parseToObject) {
  if (typeof mixedStr !== 'string' || mixedStr === '')
    throw new Error("Given string is not actually a string or it's empty!");
  if (typeof parseToObject === 'undefined')
    parseToObject = true;

  let rawTokens;
  try {
    rawTokens = matchRecursive(mixedStr, '[{\\[]', '[\\]}]', 'g', { valueNames: ['text', 'left', 'center', 'right'] });
  } catch (error) {
    if (error.message === 'Unbalanced delimiter found in string')
      throw new Error('Unbalanced amount of JSON-specific token (i.e. {, }, [, ]');
    else
      throw error;
  }

  const textResults = [], jsonResults = [], fullResults = [];

  for (let i = 0; i < rawTokens.length; i++) {
    if (rawTokens[i].name == 'left') {
      const jsonStr = rawTokens.slice(i, i + 3).map(result => result.value).join('');
      let jsonObj;
      if (parseToObject) {
        try {
          jsonObj = jsonic(jsonStr);
        } catch (err) {
          jsonObj = jsonStr;
        }
      } else {
        jsonObj = jsonStr;
      }

      jsonResults.push(jsonObj);
      fullResults.push({ type: 'json', value: jsonObj, parsed: typeof jsonObj !== 'string' });
      i += 2;
    } else {
      const text = rawTokens[i].value;
      textResults.push(text);
      fullResults.push({ type: 'text', value: text });
    }
  }

  return { textResults, jsonResults, fullResults };
}

module.exports = jsonFromText;