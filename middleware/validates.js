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
    const regex = /^([\w\-])+$/;

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

const schema = yup.object().shape({
  custom : yup.string().trim().test( obj ),
  link   : yup.string().trim().url().required()
});

module.exports = {  
  validateInp : async (req,res,next) => {
    console.log('validating ~')
    try {
      const check = [req.body,{abortEarly:false}];
      const isVal = await schema.validate(...check);
      
      if (isVal) {
        console.log('validated ✓')
        // console.log(isVal,req.body)
        req.body = isVal;
        return next();
      } else { console.error(isVal) }
    } catch (err) {
      console.log('validated ✗')
      // console.error(err)
      return next(err);
      // ! send proper error message
    }
  }
}