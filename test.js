'use strict';

const expect = require('chai').expect;
const jsonFromText = require('./index');

const normalString = 'This is a normal sentence.';
const fixtureStringOnly = require('./fixtures/fixture-string-only.json');

const normalStringObject = '{"animal": "duck"}';
const fixtureStringObjectOnly = require('./fixtures/fixture-string-object-only.json');

const sampleTextShallow = "There was a change from '{'animal':'dog', 'color':'blue'}' to '{'animal':'cat', 'color':'red'}'";
const fixtureShallowParsed = require('./fixtures/fixture-shallow-parsed.json');
const fixtureShallowUnparsed = require('./fixtures/fixture-shallow-unparsed.json');

const sampleTextDeep = "What in the {'word': world, map: {'one': 1, 'two': 2, 'three': 3}} world would that be?";
const fixtureDeepParsed = require('./fixtures/fixture-deep-parsed.json');
const fixtureDeepUnparsed = require('./fixtures/fixture-deep-unparsed.json');

const sampleTextLenient = "The brown {animal: 'fox'} jumped over the {attribute: 'lazy'} dog";
const fixtureLenientParsed = require('./fixtures/fixture-lenient-parsed.json');
const fixtureLenientUnparsed = require('./fixtures/fixture-lenient-unparsed.json');

describe('basic forms', function () {
  it('should parse regular strings as normal', function () {
    let results = jsonFromText(normalString);
    expect(results).to.deep.equal(fixtureStringOnly);
  });

  it('should parse a stringified JSON object', function () {
    let results = jsonFromText(normalStringObject);
    expect(results).to.deep.equal(fixtureStringObjectOnly);
  });
});

describe('shallow embedded JSON', function () {
  it('should seperate text and JSON, and parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextShallow);
    expect(results).to.deep.equal(fixtureShallowParsed);
  });

  it('should seperate text and JSON, but NOT parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextShallow, false);
    expect(results).to.deep.equal(fixtureShallowUnparsed);
  });
});

describe('deep embedded JSON', function () {
  it('should seperate text and JSON, and parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextDeep);
    expect(results).to.deep.equal(fixtureDeepParsed);
  });

  it('should seperate text and JSON, but NOT parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextDeep, false);
    expect(results).to.deep.equal(fixtureDeepUnparsed);
  });
});

describe('lenient embedded JSON', function () {
  it('should seperate text and JSON, and parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextLenient);
    expect(results).to.deep.equal(fixtureLenientParsed);
  });

  it('should seperate text and JSON, but NOT parse JSON text into objects', function () {
    let results = jsonFromText(sampleTextLenient, false);
    expect(results).to.deep.equal(fixtureLenientUnparsed);
  });
});

describe('error handling', function () {
  it('should throw an error when given a non-string', function () {
    let thrower = () => jsonFromText(0);
    expect(thrower).to.throw(Error, "Given string is not actually a string or it's empty!");
  });

  it('should throw an error when given an empty string', function () {
    let thrower = () => jsonFromText('');
    expect(thrower).to.throw(Error, "Given string is not actually a string or it's empty!");
  });

  it('should throw an error when given an empty string', function () {
    let thrower = () => jsonFromText('');
    expect(thrower).to.throw(Error, "Given string is not actually a string or it's empty!");
  });

  it('should throe an error when given ill-formed embedded JSON objects', function () {
    let thrower = () => jsonFromText('This {"word": "should" fail.');
    expect(thrower).to.throw(Error, 'Unbalanced amount of JSON-specific token (i.e. {, }, [, ]');
  });
});