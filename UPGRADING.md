## Upgrading from < 1.0
Previously, `jsonFromText` could take an `options` object, with one of those options being `transform_function`. Since 1.0, it's being removed because it didn't make sense to apply a transformation *before* potentially converting to a JSON object. This also makes the second argument only accept a boolean for the first option (`parse_to_json`).

### Old Syntax
```javascript
Object jsonFromText(String mixedStr, Object options)
```

### New Syntax
```javascript
Object jsonFromText(String mixedStr, Boolean parseToObject)
```