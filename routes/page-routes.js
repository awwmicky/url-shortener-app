const router = require('express').Router();
const page = require('../controllers/page-controls.js');


/* HTTP/API Request */
router.get('/:id', page.redirectToUrl)
router.get('/*', page.error)


module.exports = router;