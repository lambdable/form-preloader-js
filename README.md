# InputPreloader for JavaScript
![npm](https://img.shields.io/npm/v/input-preloader-js)

A simple input preloader to preload inputs on the web.

## Installation
### <img src="https://avatars1.githubusercontent.com/u/22247014?s=200&v=4" width="20" height="20"> Yarn
```bash
$ yarn add input-preloader-js
```

### <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" width="20" height="20"> NPM
```bash
$ npm install input-preloader-js
```

## Usage
1. Assuming you have the following form inputs and id attributes
    ```html
    <input type="radio" name="a-radio" id="a-radio"> Text for radio
    <input type="float" name="a-float" id="a-float">
    <input type="integer" name="a-integer" id="a-integer">
    <input type="string" name="a-string" id="a-string">
    ```

1. Require the InputPreloader
    ```javascript
    var InputPreloader = require("input-preloader-js");
    ```

1. Initialize the InputPreloader with your inputs and their input types
    ```javascript
    var inputs = [
        "a-radio:radio",
        "a-float:float",
        "a-integer:integer",
        "a-string:string"
    ];
    var preloader = new InputPreloader(inputs);
    ```

1. Configure the InputPreloader to preload inputs on page load, and save inputs before moving away from the page.
    ```javascript
    preloader.configure();
    ```

1. That's it! Now the inputs will be preloaded everytime the page is loaded by the user.

1. In the case where you are done with the form, and doesn't need to preload the inputs anymore, call `deconfigure()` to remove all stored inputs.
    ```javascript
    preloader.deconfigure();
    ```

## Contributing
We'd love to accept your patches and contributions to this project! Checkout [contributing](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) to learn more.

## License
Refer to the license file.
