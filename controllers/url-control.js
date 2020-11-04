const { Link } = require('../models/');
const { nanoid } = require('nanoid');
const Url = require('url-parse');


module.exports = {
    /* GET */
    findUrlByName : async (req,res,next) => {
        const { custom } = req.params;

        try {
            const data = await Link
            .query().findOne({ custom });

            // console.table([ data ])
            res.json( data )
        } catch (err) { next(err); }
    },

    /* POST */
    createShortUrl : async (req,res,next) => {
        const { custom,link } = req.body;
        const domain = new Url(link);
        req.body.domain = domain.hostname;

        try {
            if (!custom) {
                req.body.custom = nanoid(7).toLowerCase();
            } else {
                const doesExist = await Link
                .query().where('custom', custom);

                if (doesExist.length) throw new Error(
                    'custom URL name is already in use.'
                );
            }

            // ! insert new data to DB
            // const data = await Link.query().insert(req.body);
            // res.json( data )
            res.json( req.body )
        } catch (err) { next(err); }
    },

    /* PATCH */
    updateCountToURL: async (req,res,next) => {
        const { id } = req.params;
        const { count } = req.query;

        try {
            const data = await Link.query()
            .findById(id).patch({count: count + 1});

            console.table([ data ])
            res.json({ load:'✓', data }) // ?
        } catch (err) { next(err); }      
    },

    /* DELETE */
    removeURL: async (req,res,next) => {
        const { id } = req.params;

        try {
            const data = await Link.query().deleteById(id);
            console.table([ data ])
            res.json({ load:'✓', data }) // ?
        } catch (err) { next(err); }      
    },
   
    error : (req,res,next) => next()
}