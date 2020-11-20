const { fromUrl,parseDomain,ParseResultType } = require('parse-domain');
const yup = require('yup');

////

const errorResponse = (err) => {
  const { createError,path,message } = err;
  return createError({ path,message });
};

const upper = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const fn = (val) => val.replace(/\s+/g, '-');

const obj = {
  name: 'custom-name',
  message: 'error',
  lenErr  : 'Must be between 4 - 20 chars long',
  charErr : 'Must contain only a-z, 0-9, or "-"/"_"',
  test (val) {
    const { createError } = this;

    const len = val.length;
    const regex = /^[\w\s\-\_]+$/;
    const [ min,max ] = [4,20];

    const checkLength = !(min <= len && len <= max);
    const checkChars = !regex.test(val);

    if ( !val ) return true;
    if ( checkLength ) return errorResponse({
      createError , path:obj.name , message:obj.lenErr
    });
    if ( checkChars ) return errorResponse({
      createError , path:obj.name , message:obj.charErr
    });

    return val;
  }
};

const schemaUrl = yup.string().trim().url().required();
const schemaCustom =  yup.string().trim().test(obj) //.transform(fn);

////

module.exports = {
  confirmUrl: (req,res,next) => {
    const parseResult = parseDomain(fromUrl( req.body.url ));
    const msg = { 
      unknown: 'This is a reserved or unknown domain',
      invalid: 'This is an ip address or invalid domain'
    };
    let err;

    switch (parseResult.type) {
      case ParseResultType.Listed:
        req.body.domain = parseResult.icann.domain;
        next()
      break;
      case ParseResultType.Reserved:
      case ParseResultType.NotListed:
        err = new Error(msg.unknown,'DomainError');
        err.statusCode = 400;
        next( err )
      break;
      default: 
        err = new Error(msg.invalid,'DomainError');
        err.statusCode = 400;
        next( err )
      break;
    }
  },

  validateUrl : async (req,res,next) => {
    const { url } = req.body;
    try {
      const isVal = await schemaUrl.validate(url);
      
      if (isVal) {
        console.log('validated ✓')
        req.body.url = isVal;
        return next();
      } else { console.error(isVal) }
    } catch (err) {

      console.log('validated ✗')
      err.message = upper(err.message);
      err.statusCode = 400;
      return next( err );
    }
  },

  validateCustom : async (req,res,next) => {
    const custom = decodeURIComponent(req.query.custom);
    try {
      console.log(custom)
      const isVal = await schemaCustom.validate(custom);

      if (isVal) {
        console.log('validated ✓')
        req.query.custom = isVal;
        return next();
      } else { console.error(isVal) }
    } catch (err) {

      console.log('validated ✗')
      err.message = upper(err.message);
      err.statusCode = 400;
      return next( err );
    }
  }
}