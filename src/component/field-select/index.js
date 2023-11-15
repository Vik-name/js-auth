class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling

    options.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          //если кликнули не в средине field__container, то убирается атрибут active и поле(выпадающий список) закрывается
          if (!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    //ищем в родительском элементе (списке) элемент с атрибутом active
    const active =
      target.parentElement.querySelector('*[active]')
    //если такая опция есть, то она выключается (изменяется атрибут active)
    if (active) active.toggleAttribute('active')

    //добавляем в пришедший в target элемент active - это реализация функции выбора элемента из листа (меняет цвет)
    target.toggleAttribute('active')

    //получаем самый главный родительский элемент родительского элемента(field__container)
    const parent = target.parentElement.parentElement

    const value = parent.querySelector('.field__value') //ищем место куда будет записываться значение

    if (value) {
      value.innerText = target.innerText // если нашел, то кладем в innerText такой же текст, как в опции
      value.classList.remove('field__value--placeholder') // убираем класс placeholder

      const list = target.parentElement //получаем list (список опций)

      list.toggleAttribute('active') // убираем active чтобы закрыть поле
    }
  }
}

window.fieldSelect = FieldSelect
