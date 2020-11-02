const yup = require('yup');

const scheme = yup.object().shape({
  custom : yup.string().trim().matches(/[\w\-]+/i),
  link   : yup.string().trim().url().required()
})

module.exports = {
  scheme
}

// ! check for middleware option next()