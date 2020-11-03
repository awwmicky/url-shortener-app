const router = require('express').Router();
const { validateInp } = require('../middleware/validates.js');
const url = require('../controllers/url-control.js');


/* HTTP/API Request */
router.get('/:id', url.findUrlByName)
router.post(
    '/new', 
    validateInp,
    url.createShortUrl
)
router.get('/*', url.error)


module.exports = router;