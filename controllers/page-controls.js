module.exports = {
    redirectToUrl : async (req,res) => {
        const {  id : name } = req.params;

        try {
            const data = await db; // findOne(name)
            if (data) res.redirect(data.url);
            else res.redirect(`/?error=${name}-not-found`)
        } catch (err) { res.redirect('/?error=link-not-found'); }
    },

    error : (req,res,next) => next()
}