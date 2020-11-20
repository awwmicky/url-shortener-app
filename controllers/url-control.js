const { Url_Link } = require('../models/');
const { nanoid } = require('nanoid');
// const { viewLogs } = require('./utils.js');


module.exports = {
    /* GET */
    findUrlByName : async (req,res,next) => {
        const { custom } = req.params;

        try {
            const data = await Url_Link.query().findOne({ custom });
            // viewLogs([ data ])
            res.status(200).json( data )
        } catch (err) { next(err) }
    },

    /* POST */
    createShortUrl : async (req,res,next) => {
        req.body.custom = nanoid(7).toLowerCase();
        const { custom } = req.body;

        try {
            const doesExist = await Url_Link.query().findOne({ custom });
            if ( doesExist ) throw new Error('Try again','UrlError');
           
            const data = {
                ... await Url_Link.query().insert(req.body),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                checked: false,
                count: 0
            };

            // viewLogs([ data ])
            res.status(201).json( data )
        } catch (err) { next( err ) }
    },

    /* PATCH custom */
    updateCustomToUrl: async (req,res,next) => {
        const { id } = req.params;
        const { custom } = req.query;

        try {
            const doesExist = await Url_Link.query().findOne({ custom });
            const errMsg = 'Custom URL name is already in use';
            if ( doesExist ) throw new Error(errMsg,'UrlError');

            await Url_Link.query().findById(id).patch({ custom });
            // const data = await Url_Link.query().findById(id);
            // viewLog([ data ])
            res.status(204).send('custom updated  ✓')
        } catch (err) { next( err ) }
    },

    /* PATCH count */
    updateCountToUrl: async (req,res,next) => {
        const { id } = req.params;
        let { count } = req.query;
        count = +(count) + 1;

        try {
            await Url_Link.query().findById(id).patch({ count });
            // const data = await Url_Link.query().findById(id);
            // viewLog([ data ])
            res.status(204).send('count updated  ✓')
        } catch (err) { next(err) }
    },

    /* DELETE */
    removeUrl: async (req,res,next) => {
        const { id } = req.params;

        try {
            await Url_Link.query().deleteById(id);
            // const data = await Url_Link.query();
            // viewLog( data )
            res.status(204).send('url deleted ✓')
        } catch (err) { next(err) }
    },

    error : (req,res,next) => next()
}