const { Url_Link } = require('../models/');
const { viewLogs } = require('./utils.js');


module.exports = {
    /* GET all */
    displayAllUrls : async (req,res,next) => {
        try {
            const data = await Url_Link.query();
            // viewLogs( data )
            res.send( data )
        } catch (err) { next(err) }
    },

    /* GET one */
    redirectToUrl : async (req,res) => {
        const { custom } = req.params;

        try {
            const data = await Url_Link.query().findOne({ custom });
            const upd = await Url_Link.query()
            .patchAndFetchById(data.id, {count: +(data.count) + 1});
            viewLogs([ data ])
            
            if (process.env.NODE_ENV === "development") {
                return res.json( data );
            }

            if (data) res.redirect( data.url );
            else res.redirect(`/?error=${ custom }-not-found`);
        } catch (err) { res.redirect('/?error=link-not-found'); }
    },

    error : (req,res,next) => next()
}