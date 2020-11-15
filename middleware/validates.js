const yup = require('yup');

const errorResponse = (err) => {
  const { createError,path,message } = err;
  return createError({ path,message });
};

const obj = {
  name: 'custom-name',
  message: 'error',
  lenErr  : 'custom URL must be between 2 - 30 char long.',
  charErr : 'custom URL must contain a-z,0-9, or "-".',
  test (val) {
    const { createError } = this;

    const len = val.length;
    const regex = /^([\w\s\-])+$/;

    if (!val) return true;
    if ( !(2 <= len && len <= 30) ) return errorResponse({
      createError, path:obj.name, message:obj.lenErr
    });
    if ( !regex.test(val) ) return errorResponse({
      createError, path:obj.name, message:obj.charErr
    });
    return val;
  }
};

const fn = (val) => val.replace(/\s+/g, '-');

const schemaUrl = yup.string().trim().url().required();
const schemaCustom =  yup.string().trim().test( obj ).transform( fn );

module.exports = {  
  validateUrl : async (req,res,next) => {
    try {
      const isVal = await schemaUrl.validate(req.body.url);
      
      if (isVal) {
        console.log('validated ✓')
        // console.log(isVal,req.body)
        req.body.url = isVal;
        return next();
      } else { console.error(isVal) }
    } catch (err) {
      console.log('validated ✗')
      // console.error(err)
      return next(err);
      // ! SEND proper error message
    }
  },

  validateCustom : async (req,res,next) => {
    try {
      const isVal = await schemaCustom.validate(req.query.custom);
      
      if (isVal) {
        console.log('validated ✓')
        // console.log(isVal,req.query)
        req.query.custom = isVal;
        return next();
      } else { console.error(isVal) }
    } catch (err) {
      console.log('validated ✗')
      // console.error(err)
      return next(err);
      // ! SEND proper error message
    }
  }
}