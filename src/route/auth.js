// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})

// ================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'Користувач' },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Адміністратор',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Розробник',
        },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  console.log(req.body)

  //если все поля не заполнены, то выбает ошибку(код 400) - сообщение
  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Помилка. Обов'якові поля відсутні",
    })
  }

  try {
    User.create({ email, password, role }) //бизнес-логика

    //при успешном выполнении запроса (код 200)
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
    })
  } catch (err) {
    return req.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
