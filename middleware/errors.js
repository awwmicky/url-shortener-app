module.exports = {
  /* 404 */
  pageNotFoundError: (req,res,next) => {
    const error = new Error('✗: Page Not Found');
    error.statusCode = 404;
    next(error)
  },

  customErrorHandling: (err,req,res,next) => {
    console.error( err )
    res.json({ error: {
      code        : err.name || '✗: Internal Error',
      statusCode  : err.statusCode || 500,
      message     : err.message || '✗: Internal Server Error',
      stack       : process.env.NODE_ENV === 'production' ? "✗" : err.stack
    }})
  },

  /* 505 || 500 */
  internalServerError: (err,req,res,next) => {
    console.error(err)
    res.status(err.status || 505).json({ 
      error: { 
        status: (err.status || 500),
        message: (err.message || '✗: Internal Server Error'),
        stack: process.env.NODE_ENV === 'production' ? "✗" : err.stack
      }
    })
  }
}