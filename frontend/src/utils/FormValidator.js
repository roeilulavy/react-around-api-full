export default class FormValidator {
  constructor (settings, formElement) {
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass

    this._formElement = formElement

    this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)]
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  _showInputError (inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)

    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)

    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _toggleButtonState () {
    const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid)
    if (hasInvalidInput) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.disabled = false
    }
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners () {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation () {
    this._toggleButtonState()

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }

  enableValidation () {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }
}
