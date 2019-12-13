/*
* InputPreloader 2.0.1
* Copyright © 2019 Zaim Ramlan
*/

class InputPreloader {

    /**
    * Creates an instance of InputPreloader.
    *
    * @constructor
    * @author: Zaim Ramlan
    * @param {array} inputs The array of inputs with their corresponding expected input type, that
    * are desired to be preloaded.
    */
    constructor(inputs) {
        this._inputs = this._toObject(inputs);
    }

    /**
     * Configures to save the given inputs before moving away from
     * the page, and preloads them (if their data exists).
     */
    configure() {
        this._setToSaveInputsBeforeUnloading();
        this._preloadInputsIfAvailable();
    }

    /**
     * Deconfigures to not save the given inputs before moving away from
     * the page, and remove all stored inputs (if their data exists).
     */
    deconfigure() {
        this._unsetToSaveInputsBeforeUnloading();
        this._removeAllStoredInputs();
    }

    /**
    * Breaks down the inputs from string, into a object of inputs.
    *
    * @param {array} inputs The array of inputs with their corresponding expected input type, that
    * are desired to be preloaded.
    * @return {array} An array of input objects of each inputs passed.
    */
    _toObject(inputs) {
        inputsArray = [];

        inputs.forEach((input) => {
            inputDetails = input.split(":");
            inputHash = { id: inputDetails[0], type: inputDetails[1], value: null };
            inputsArray.push(inputHash);
        });

        return inputsArray;
    }

    /**
     * Sets to save inputs' values in the session storage for preloading,
     * before unloading the page.
     */
    _setToSaveInputsBeforeUnloading() {
        var self = this;

        window.onbeforeunload = function() {
            self._inputs.forEach((input) => {
                var element = document.getElementById(input.id);

                if (element !== null) {
                    var isRadioButton = input.type === "radio";
                    var value = isRadioButton ? element.checked : element.value;
                    sessionStorage.setItem(input.id, value);
                }
            });
        }
    }

    /**
     * Preloads inputs' values, if they are available.
     */
    _preloadInputsIfAvailable() {
        var self = this;

        this._inputs.forEach((input) => {
            var value = sessionStorage.getItem(input.id);

            if (value !== null) {
                input.value = value;
                self._preload(input);
            }
        });
    }

    /**
     * Preloads the element with the `input.id`, to the `input.value`
     * of `input.type`.
     *
     * @param {object} input The input object that has the input's `id`, `type` and `value`.
     */
    _preload(input) {
        if (input.value !== "") {
            switch(input.type) {
            case "radio":
                input.value = input.value === "true";
                break;

            case "float":
                input.value = parseFloat(input.value);
                break;

            case "integer":
                input.value = parseInt(input.value);
                break;

            case "string":
                // do nothing with `input.value` as it's already a string
                break;
            }
        }

        var element = document.getElementById(input.id);
        if (element !== null) {
            var isRadioButton = input.type === "radio";
            isRadioButton ? element.checked = input.value : element.value = input.value;
        }
    }

    /**
     * Remove functions to be executed on `window.onbeforeunload`.
     */
    _unsetToSaveInputsBeforeUnloading() {
        window.onbeforeunload = null;
    }

    /**
     * Removes all stored inputs.
     */
    _removeAllStoredInputs() {
        this._inputs.forEach((input) => {
            sessionStorage.removeItem(input.id);
        });
    }
}

module.exports = InputPreloader;
