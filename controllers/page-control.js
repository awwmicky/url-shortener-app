const { Link } = require('../models/');

module.exports = {
    /* GET all */
    displayAllUrls : async (req,res) => {
        try {
            const data = await Link.query();
            // console.table(data)
            res.send( data )
        } catch (err) { next(err) }
    },

    /* GET one */
    redirectToUrl : async (req,res) => {
        const {  id : custom } = req.params;

        try {
            const data = await Link
            .query().findOne({ custom });

            console.log(data)

            // return res.send(data)
            // if (data === null) return res.sendStatus(404);

            if (data) res.redirect( data.link );
            else res.redirect(`/?error=${ custom }-not-found`)
        } catch (err) { res.redirect('/?error=link-not-found'); }
    },

    error : (req,res,next) => next()
}