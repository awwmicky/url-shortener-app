module.exports = {
  /* 404 */
  pageNotFoundError: (req,res,next) => {
    const error = new Error('✗: Page Not Found');
    error.status = 404;
    next(error)
  },

  // FIXME : respond, error message
  /* 505 / 500 */
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
