const { check, validationResult, body } = require("express-validator");

  const userValidationRules = () => {
    return [
    check('desc', 'Description length should be 2 to 30 characters').not().bail().isEmpty().bail().isLength({ min: 2, max: 30 }).bail(), 
    ]
  }

  
  const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        console.log(errors);
        res.status(422).json(errors.array()) 
    } 
    if (errors.isEmpty()) {
      return next()
    }

  }
  
  module.exports = {
    userValidationRules,
    validate,
  }
