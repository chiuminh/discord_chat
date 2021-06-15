function Validator(options) {
  let formElement = document.querySelector(options.form)
  let rules = options.rules
  let selectorRules = {}

  let getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) return element.parentElement
      element = element.parentElement
    }
  }

  let validateForm = (inputElement, rule) => {
    var selectorMessage = getParent(inputElement, options.formGroupSelector).querySelector(options.selectorMessage)
    var formGroup = getParent(inputElement, options.formGroupSelector)
    var messageError
    for (test of selectorRules[rule.selector]) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          messageError = test(formElement.querySelector(rule.selector + ':checked'))
          break;
        default:
          messageError = test(inputElement.value)
          break;
      }
      if (messageError) break
    }
    if (messageError) {
      selectorMessage.innerText = messageError
      formGroup.classList.add(options.selectorClassInvalid)
    }
    return !messageError
  }

  if (formElement) {
    // khi submit form
    formElement.onsubmit = (e) => {
      e.preventDefault()

      let isFormValid = true
      // Lặp qua từng rule và validate
      rules.forEach(rule => {
        var inputElement = document.querySelector(rule.selector)
        var isValid = validateForm(inputElement, rule)
        if (!isValid) {
          isFormValid = false
        }
      })

      if (isFormValid) {
        // Trường hợp submit với javascript
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
          var formValues = Array.from(enableInputs).reduce((values, input) => {
            switch (input.type) {
              case 'checkbox':
                if (!input.matches(':checked')) return values
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = []
                }
                values[input.name].push(input.value)
                break;
              case 'radio':
                values[input.name] =
                  formElement.querySelector('input[name=' + input.name + ']:checked').value
                break;
              case 'file':
                values[input.name] = input.files
                break;
              default:
                values[input.name] = input.value
            }
            return values
          }, {})
          options.onSubmit(formValues)
        }
        // Trường hợp submit mặc định
        else {
          formElement.submit()
        }
      }
    }

    // Lặp qua từng rule và validate
    rules.forEach(rule => {
      var inputElements = document.querySelectorAll(rule.selector)
      Array.from(inputElements).forEach(inputElement => {
        // Lưu lại rule
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test)
        } else {
          selectorRules[rule.selector] = [rule.test]
        }
        // Lặp qua từng rule và lắng nghe sự kiện blur
        inputElement.onblur = (e) => {
          validateForm(e.target, rule)
        }
        // Lặp qua từng rule và lắng nghe sự kiện oninput
        inputElement.oninput = (e) => {
          var selectorMessage = getParent(inputElement, options.formGroupSelector).querySelector(options.selectorMessage)
          var formGroup = getParent(inputElement, options.formGroupSelector)
          selectorMessage.innerText = ''
          formGroup.classList.remove(options.selectorClassInvalid)
        }
      })

    })
  }

}

Validator.isRequired = (selector, message = 'Vui lòng nhâp trường này!') => {
  return {
    selector,
    test: value => value ? undefined : message
  }
}
Validator.isEmail = (selector, message = 'Trường này phải là email!') => {
  var email_validator_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return {
    selector,
    test: value => email_validator_regex.test(value) ? undefined : message
  }
}
Validator.minLength = (selector, min = 6, message = `Vui lòng nhập giá trị lớn ${min} ký tự`) => {
  return {
    selector,
    test: value => value.length >= 6 ? undefined : message
  }
}
Validator.ref = (selector, getConfirmValue, message = `Giá tri nhập lại không khớp!`) => {
  return {
    selector,
    test: value => value === getConfirmValue() ? undefined : message
  }
}
