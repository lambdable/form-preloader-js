/*
* InputPreloader 2.0.0
* Copyright © 2019 Zaim Ramlan
*/

class InputPreloader {

    /**
    * Creates an instance of InputPreloader.
    *
    * @constructor
    * @author: Zaim Ramlan
    * @param {array} input The array of form fields with its corresponding expected field type, that
    * are desired to be preloaded.
    */
    constructor(inputs) {
        this._inputs = this._toHash(inputs);
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
    * Breaks down the form fields from string, into a hash of inputs.
    *
    * @param {array} input The array of form fields with its corresponding expected field type, that
    * are desired to be preloaded.
    * @return {array} An array of hashes of each form fields passed.
    */
    _toHash(inputs) {
        inputsArray = [];

        inputs.forEach((input) => {
            inputDetails = input.split(":");
            inputHash = { id: inputDetails[0], type: inputDetails[1], value: null };
            inputsArray.push(inputHash);
        });

        return inputsArray;
    }

    /**
     * Saves inputs' values in the session storage before for preloading,
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
     * Preloads inputs' values, if it's available.
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
     * Preloads the element with the `input.id`, to
     * the `input.value` of `input.type`.
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
     * Remove any functions to be executed on `onbeforeunload`.
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
