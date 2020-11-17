const router = require('express').Router();
const {  validateUrl , validateCustom 
} = require('../middleware/validates.js');
const url = require('../controllers/url-control.js');


/* HTTP/API Request */
router.get('/:custom', url.findUrlByName)
router.post('/new', validateUrl, url.createShortUrl)
router.patch('/:id', validateCustom, url.updateCustomToUrl)
router.patch('/:id', url.updateCountToUrl)
router.delete('/:id', url.removeUrl)
router.get('/*', url.error)


module.exports = router;