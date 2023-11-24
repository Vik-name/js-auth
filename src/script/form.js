export const REG_EXP_EMAIL = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
)
export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
)

export class Form {
  FIELD_NAME = {}
  FIELD_ERROR = {}

  value = {}
  error = {}
  disabled = true

  //принимает значение name и value. Если они проходят валидацию, то будут записываться
  change = (name, value) => {
    const error = this.validate(name, value)
    this.value[name] = value

    // если есть ошибка
    if (error) {
      this.setError(name, error) //задаем в верстке ошибку (строку текста в error)
      this.error[name] = error //добавляем объект в error
    } else {
      this.setError(name, null) // передаем null - выключаем  в верстке
      delete this.error[name] //удаляем ошибку по name
    }

    this.checkDisabled()
  }

  setError = (name, error) => {
    //находим span, где будем писать ошибку
    const span = document.querySelector(
      `.form__error[name="${name}"]`,
    )

    const field = document.querySelector(
      `.validation[name="${name}"]`,
    )

    if (span) {
      span.classList.toggle(
        //добавляется или убирается класс через toggle
        'form__error--active',
        //этот атрибут указывает нужно вклчить или выключить(true или false)
        Boolean(error),
      )
      //в innerText ставится ошибка или ничего если error не приходит (null)
      span.innerText = error || ''
    }

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }
  }

  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    const el = document.querySelector(`.button`)

    if (el) {
      el.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      )
    }

    this.disabled = disabled
  }

  validateAll = () => {
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
      }
    })
  }

  setAlert = (status, text) => {
    const el = document.querySelector(`.alert`)

    if (status === 'progress') {
      el.className = 'alert alert--progress'
    } else if (status === 'success') {
      el.className = 'alert alert--success'
    } else if (status === 'error') {
      el.className = 'alert alert--error'
    } else {
      el.className = 'alert alert--disabled'
    }

    if (text) el.innerText = text
  }
}
