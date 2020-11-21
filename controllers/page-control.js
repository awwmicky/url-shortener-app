const url = require('url');
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
        if (process.env.NODE_ENV === 'production') {
            const { referer } = req.headers;
            const custom = url.parse(referer).pathname.substring(1);
            console.log('test:',referer, custom)

            try {
                const data = await Url_Link.query().findOne({ custom });
                if ( !data ) return res.redirect('/');
                let { id , url , count } = data;
                count = +(count) + 1;
                await Url_Link.query().patchAndFetchById( id,{ count });
                
                if (url) res.status(302).redirect( url );
                else res.status(304).redirect(`/?error=${ custom }-not-found`);
            } catch (err) { res.status(304).redirect('/?error=link-not-found'); }
        }

        if (process.env.NODE_ENV === 'development') {
            const { custom } = req.params;
            try {
                const data = await Url_Link.query().findOne({ custom });
                if ( !data ) return res.send('false');
                let { id , url , count } = data;
                count = +(count) + 1;
                await Url_Link.query().patchAndFetchById( id,{ count });
                
                return res.send( url );
            } catch (err) { next(err) }
        }
    },

    error : (req,res,next) => next()
}