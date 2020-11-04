const router = require('express').Router();
const page = require('../controllers/page-control.js');


/* HTTP/API Request */
router.get('/all', page.displayAllUrls)
router.get('/:id', page.redirectToUrl)
router.get('/*', page.error)


module.exports = router;