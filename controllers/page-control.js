const { Url_Link } = require('../models/');

module.exports = {
    /* GET all */
    displayAllUrls : async (req,res,next) => {
        try {
            const data = await Url_Link.query();
            // console.table(data)
            res.send( data )
        } catch (err) { next(err) }
    },

    /* GET one */
    redirectToUrl : async (req,res) => {
        const { custom } = req.params;

        try {
            const data = await Url_Link
            .query().findOne({ custom });

            console.table([ data ])
            if (data) res.redirect( data.url );
            else res.redirect(`/?error=${ custom }-not-found`)
        } catch (err) { res.redirect('/?error=link-not-found'); }
    }, // ! apply react-router-dom to redirect
    // ! fix redirect

    error : (req,res,next) => next()
}