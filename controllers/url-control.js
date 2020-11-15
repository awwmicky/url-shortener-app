const { Url_Link } = require('../models/');
const { nanoid } = require('nanoid');
const Url = require('url-parse');
const { viewLogs } = require('./utils.js');


module.exports = {
    /* GET */
    findUrlByName : async (req,res,next) => {
        const { custom } = req.params;

        try {
            const data = await Url_Link.query().findOne({ custom });
            // viewLogs([ data ])
            res.json( data )
        } catch (err) { next(err) }
    },

    /* POST */
    createShortUrl : async (req,res,next) => {
        const domain = new Url(req.body.url);
        req.body.domain = domain.hostname;
        req.body.custom = nanoid(7).toLowerCase();

        try {
            const doesExist = await Url_Link.query()
            .where('custom', req.body.custom);

            if (doesExist.length) throw new Error(
                'custom URL name is already in use.'
            );

            const data = await Url_Link.query().insert(req.body);
            // viewLogs([ data ])
            res.json( data )
        } catch (err) { next(err) }
    },

    /* PATCH custom */
    updateCustomToUrl: async (req,res,next) => {
        const { id } = req.params;
        const { custom } = req.query;

        try {
            const updated = await Url_Link.query()
            .findById(id).patch({ custom });
            // const data = await Url_Link.query();
            // viewLog( data )
            // res.json( data )
            res.send('custom updated  ✓')
        } catch (err) { next(err) }
    },

    /* PATCH count */
    updateCountToUrl: async (req,res,next) => {
        const { id } = req.params;
        const { count } = req.query;

        try {
            const updated = await Url_Link.query()
            .findById(id).patch({count: +(count) + 1});
            // const data = await Url_Link.query();
            // viewLog( data )
            // res.json( data )
            res.send('count updated  ✓')
        } catch (err) { next(err) }
    },

    /* DELETE */
    removeUrl: async (req,res,next) => {
        const { id } = req.params;

        try {
            const deleted = await Url_Link.query().deleteById(id);
            // const data = await Url_Link.query();
            // viewLog( data )
            // res.json( data )
            res.send('url deleted ✓')
        } catch (err) { next(err) }
    },

    error : (req,res,next) => next()
}