var express = require('express');
var router = express.Router();
const { indexController } = require('../controller/indexController');
const { userValidationRules, validate } = require('../middleware/validators');


/* GET home page. */
router.get('/', indexController.getController);

router.post('/', userValidationRules(), validate, indexController.postController);

router.patch('/:id',userValidationRules(), validate, indexController.patchController);

router.delete('/:id', indexController.deleteController);

module.exports = router;
