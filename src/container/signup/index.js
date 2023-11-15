class SignupForm {
  static value = {}

  //проверка на корректность значения
  static validate = (name, value) => {
    return true
  }

  //привязываем событие (функцию) на кнопку, чтобы отправлять данные на сервер
  static submit = () => {
    console.log(this.value)
  }

  //принимает значение name и value. Если они проходят валидацию, то будут записываться
  static change = (name, value) => {
    console.log(name, value)
    if (this.validate(name, value)) this.value[name] = value
  }
}

window.signupForm = SignupForm
