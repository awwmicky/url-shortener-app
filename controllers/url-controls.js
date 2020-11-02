// const { Link,User } = require('../models/');
const yup = require('yup');
const { nanoid } = require('nanoid');

const scheme = yup.object().shape({
    username: yup.string().trim().matches(/[\w\_\-]+/i),
    name: yup.string().trim().matches(/[\w\_\-]+/i),
    link: yup.string().trim().url().required()
})

module.exports = {
    readShortUrlById : (req,res) => {
        res.send('your short URL')
    },

    createShortUrl : async (req,res,next) => {
        let { username,name,link } = req.body;
        console.log(req.body)

        try {
            await scheme.validate(req.body)

            username = username.trim();
            if (!name) {
                name = nanoid(7).toLowerCase();
            } else {
                const doesExist = await db; // findOne(name)
                if (doesExist) throw new Error(
                    'custom URL name is already in use.'
                );
            }

            let user = { username };
            let data = { name, link };

            res.json({ ...user, data })
        } catch (err) { next(err); }
    },
   
    error : (req,res,next) => next()
}