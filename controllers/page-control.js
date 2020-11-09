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
            // ! UPDATE Url_Link count++
            const data = await Url_Link.query().findOne({ custom });
            viewLogs([ data ])

            // ! FIX redirect
            // res.header("Access-Control-Allow-Origin", "*");
            // res.header("Access-Control-Allow-Origin", 'https://www.google.com/');
            // return res.statusCode(301).redirect( data.url );
            return res.statudCode(302).redirect( 'https://www.google.com/' );
            // return res.writeHead(302, { 'Location':'https://www.google.com/' })

            // if (data) res.redirect( data.url );
            // else res.redirect(`/?error=${ custom }-not-found`)
        } catch (err) { res.redirect('/?error=link-not-found'); }
    },

    error : (req,res,next) => next()
}