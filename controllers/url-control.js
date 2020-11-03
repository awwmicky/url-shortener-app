const { Link } = require('../models/');
const { nanoid } = require('nanoid');


module.exports = {
    /* GET */
    findUrlByName : async (req,res,next) => {
        const {  id:custom } = req.params;

        try {
            const data = await Link
            .query().findOne({ custom });

            console.table([ data ])

            res.json( data )
        } catch (err) { next(err); }
    },

    /* POST */
    createShortUrl : async (req,res,next) => {
        const { custom } = req.body;
        // if (true) return res.json('ok…');

        try {
            if (!custom) {
                req.body.custom = nanoid(7).toLowerCase();
            }  else {
                const doesExist = await Link
                .query().where('custom', custom);

                if (doesExist.length) throw new Error(
                    'custom URL name is already in use.'
                );
            }

            // ! insert new data to DB
            const data = req.body;

            res.json( data )
        } catch (err) { next(err); }
    },
   
    error : (req,res,next) => next()
}