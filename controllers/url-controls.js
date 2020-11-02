const { scheme } = require('../middleware/validates.js');
const { Link } = require('../models/');
const { nanoid } = require('nanoid');


module.exports = {
    /* GET */
    findUrlByName : async (req,res) => {
        if (true) return res.send('ok…');

        // ! check custom URL in DB
        // ! update count in DB

        try {
            const data = await Link.query();

            console.table(data)

            res.send('your short URL')   
        } catch (err) { console.log(err); }
    },

    /* POST */
    createShortUrl : async (req,res,next) => {       
        const { custom,link } = req.body;
        console.log(req.body)

        try {
            await scheme.validate(req.body)
            console.log(req.body)

            if (!custom) {
                req.body.custom = nanoid(7).toLowerCase();
            } else {
                const doesExist = await Link
                .query().where('custom', custom);

                // if (doesExist) throw new Error(
                //     'custom URL name is already in use.'
                // );

                if (doesExist) return next(new Error(
                    'custom URL name is already in use.'
                ));
            }

            // ! insert new data to DB

            let data = { name, link };

            res.json({ data })
        } catch (err) { next(err); }
    },
   
    error : (req,res,next) => next()
}