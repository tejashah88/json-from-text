## Changelog

### 1.x (Next)
* Your commit goes here

### 1.1.0 (Dec/19/2018)
* The module will try to parse each and every potential JSON object and otherwise leave it as a string if it can't - [@tejashah88](https://github.com/tejashah88)

### 1.0.0 (Oct/8/2018)

* First official release - [@tejashah88](https://github.com/tejashah88)
  * If you were using this library prior to 1.0, please see the [UPGRADING](UPGRADING.md) document for migration instructions
* Added tests, travis CI, and code coverage from coveralls.io - [@tejashah88](https://github.com/tejashah88)
* Removed `transform_function` from options and replaced the `options` argument with `parse_to_json` - [@tejashah88](https://github.com/tejashah88)
* Added error handling with ill-formed embedded JSON objects - [@tejashah88](https://github.com/tejashah88)