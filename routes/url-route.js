const router = require('express').Router();
const { validateInp } = require('../middleware/validates.js');
const url = require('../controllers/url-control.js');


/* HTTP/API Request */
router.get('/:custom', url.findUrlByName)
router.post('/new', validateInp, url.createShortUrl)
router.patch('/:id', url.updateCountToURL)
router.delete('/:id', url.removeURL)
router.get('/*', url.error)


module.exports = router;