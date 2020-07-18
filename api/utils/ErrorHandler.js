module.exports = function(res, error) {
    let response = {
        status: error.status || error.response.status || 500,
        message: `Ups, something bad happened: ${error.message}` || 'Ups, something bad happened: Internal Server Error',
        error: JSON.stringify(error)
      };
    return res.render('error.ejs', response);
}