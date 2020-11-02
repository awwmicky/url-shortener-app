const router = require('express').Router();
const url = require('../controllers/url-controls.js');


/* HTTP/API Request */
router.get('/:id', url.readShortUrlById)
router.post('/new', url.createShortUrl)
router.get('/*', url.error)


module.exports = router;