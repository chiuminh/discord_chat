const Validator = (formSelector, options = {}) => {
  let getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) return element.parentElement
      element = element.parentElement
    }
  }


  let formRules = {}

  /**
   *  Quy ước tạo rules
   *  + Có lỗi thì in ra lỗi
   *  + Nếu không có lỗi thì in ra undefined
   * */
  let validatorRules = {
    required: (value) => value ? undefined : '- Ô này là bắt buộc.',
    email: (value) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return emailRegex.test(value) ? undefined : '- Vui lòng nhập email.'
    },
    min: (min) => (value) => value.length >= min ? undefined : `- Vui lòng nhập ít nhất ${min} ký tự.`
  }

  // select form need validation from formSelector
  let formElement = document.querySelector(formSelector)
  if (formSelector) {
    let inputs = formElement.querySelectorAll('[name][rules]:not([disabled])')

    inputs.forEach(input => {
      let rules = input.getAttribute('rules').split('|')
      rules.forEach(rule => {
        let isRuleHasValue = rule.includes(':')
        let ruleInfo
        if (isRuleHasValue) {
          ruleInfo = rule.split(':')
          rule = ruleInfo[0]
        }
        let ruleFunc = validatorRules[rule]
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1])
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc)
        } else {
          formRules[input.name] = [ruleFunc]
        }
      })
      // Lắng nghe sự kiện (blur, input, ...)
      input.onblur = handeValidate
      input.oninput = handeClearError
    })

    function handeValidate(event) {
      let rules = formRules[event.target.name]
      let errorMessage

      rules.find(rule => {
        errorMessage = rule(event.target.value)
        return errorMessage
      })

      if (errorMessage) {
        let formGroup = getParent(event.target, '.form-group')
        if (!formGroup) return
        formGroup.classList.add('is-invalid')
        let formMessage = formGroup.querySelector('.form-message')
        if (formMessage) {
          formMessage.textContent = errorMessage
        }
      }

      return !errorMessage
    }

    function handeClearError(event) {
      let formGroup = getParent(event.target, '.form-group')
      if (formGroup.classList.contains('is-invalid')) {
        formGroup.classList.remove('is-invalid')
        let formMessage = formGroup.querySelector('.form-message')
        if (formMessage) {
          formMessage.textContent = ''
        }
      }
    }
  }


  formElement.onsubmit = (e) => {
    e.preventDefault()
    let inputs = formElement.querySelectorAll('[name][rules]:not([disabled])')
    let isValid = true
    inputs.forEach(input => {
      if (!handeValidate({ target: input })) {
        isValid = false
      }
    })

    // Khi không có lỗi thì submit form
    if (isValid) {
      // Trường hợp submit với javascript
      if (typeof options.onSubmit === 'function') {
        var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
        var formValues = Array.from(enableInputs).reduce((values, input) => {
          switch (input.type) {
            case 'checkbox':
              if (!input.matches(':checked')) {
                values[input.name] = ''
                return values
              }
              if (!Array.isArray(values[input.name])) {
                values[input.name] = []
              }
              values[input.name].push(input.value)
              formElement.querySelectorAll('input[name=' + input.name + ']:checked').value
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
}