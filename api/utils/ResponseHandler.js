module.exports = function(res, data) {
    let response = {
        status: 200,
        message: `This is looking awesome`,
        data: JSON.stringify(data)
    };
    return res.render('success.ejs', response);
}