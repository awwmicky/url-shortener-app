const yup = require('yup');

const errorResponse = (that,message) => {
  const { path,createError } = that;
  return createError({ path,message });
};

const obj = {
  t : 'test-name',
  m : 'error message',

  lenErr  : 'custom URL must be between 2 - 30 char long.',
  charErr : 'custom URL must contain a-z,0-9, or "-".',

  fn (val) {
    console.log(val)
    const len = val.length;
    const regex = /^([\w\-])+$/;

    // if (true) return false;

    if (!val) return true;
    if (len <= 2 && 30 >= len) return errorResponse(this, obj.lenErr);
    if ( !regex.test(val) ) return errorResponse(this, obj.charErr);
    return true;
  }
};

const schema = yup.object().shape({
  // custom : yup.string().trim().test( obj.t,obj.m,obj.fn ),
  link   : yup.string().trim().url().required()
});

module.exports = {  
  validateInp : async (req,res,next) => {
    console.log(req.body)
    try {
      console.log('validating ~')
      const isValid = await schema.validateSync(
        { link: req.body.link }
        // ,{ abortEarly:false }
      );
      console.log('validated ✓','\n',isValid)
      req.body.link = isValid.link;
      console.log(req.body)
      next()
    } catch (err) { next(err); }
  }
}

// ! check for middleware option next()