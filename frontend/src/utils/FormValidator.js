export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputsList.some(inputElement => !inputElement.validity.valid)
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    };

    _removeValidationErrors() {
        this._inputsList.forEach(input => {
            this._hideInputError(input);
        });
    };

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    _setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputsList.forEach(inputElement => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

        this._form.addEventListener('reset', () => {
            this._removeValidationErrors();
            this._toggleButtonState();
        });
    }

    enableValidation() {
        this._setEventListeners();
    };
}
