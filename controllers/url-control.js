const { Url_Link } = require('../models/');
const { nanoid } = require('nanoid');
const Url = require('url-parse');

const viewLog = (data) => console.table(
    data , ['id', 'custom', 'domain', 'url', 'count']
);

module.exports = {
    /* GET */
    findUrlByName : async (req,res,next) => {
        const { custom } = req.params;

        try {
            const data = await Url_Link
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
        req.body.url = link;
        delete req.body.link;

        try {
            if (!custom) {
                req.body.custom = nanoid(7).toLowerCase();
            } else {
                const doesExist = await Url_Link
                .query().where('custom', custom);

                console.log( doesExist )

                if (doesExist.length) throw new Error(
                    'custom URL name is already in use.'
                );
            }

            const data = await Url_Link.query().insert(req.body);
            console.table([ data ])
            res.json( data )
        } catch (err) { next(err); }
    },

    /* PATCH */
    updateCountToURL: async (req,res,next) => {
        const { id } = req.params;
        const { count } = req.query;

        try {
            const up = await Url_Link.query()
            .findById(id).patch({count: +(count) + 1});
            // const data = await Url_Link.query();
            // viewLog( data )
            // res.json( data )
            res.send('count updated  ✓')
        } catch (err) { next(err); }      
    },

    /* DELETE */
    removeURL: async (req,res,next) => {
        const { id } = req.params;

        try {
            const del = await Url_Link.query().deleteById(id);
            // const data = await Url_Link.query();
            // viewLog( data )
            // res.json( data )
            res.send('url deleted ✓')
        } catch (err) { next(err); }      
    },

    error : (req,res,next) => next()
}