const { Url_Link } = require('../models/');
const { viewLogs } = require('./utils.js');


module.exports = {
    /* GET all */
    displayAllUrls : async (req,res,next) => {
        try {
            const data = await Url_Link.query();
            // viewLogs( data )
            res.status(200).send( data )
        } catch (err) { next(err) }
    },

    /* GET one */
    redirectToUrl : async (req,res) => {
        const { custom } = req.params;
        console.log( req.headers['host']  )

        try {
            const data = await Url_Link.query().findOne({ custom });
            if ( !data ) return res.send('false');
            const { id , url , count } = data;
            await Url_Link.query().patchAndFetchById( id,{ count:+(count)+1 });
            
            if (process.env.NODE_ENV === "development") return res.send( url );

            if (url) res.status(302).redirect( url );
            else res.status(304).redirect(`/?error=${ custom }-not-found`);
        } catch (err) { res.status(304).redirect('/?error=link-not-found'); }
    },

    error : (req,res,next) => next()
}