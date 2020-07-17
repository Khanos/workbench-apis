const path = require('path');
const axios = require('axios');
const errorHandler = require(`${path.resolve()}/api/utils/ErrorHandler`);
const linkedinCredentials = require(`${path.resolve()}/.credentials/linkedin_oauth_credentials.json`);

module.exports = {
    index: (req, res) => {
        return res.send('Hello from Linkedin Controller');
    },

    getLogin: async (req, res) => {
        try {
            let options = {
                method: 'get',
                url: linkedinCredentials.authorization_url,
                params: {
                    response_type: linkedinCredentials.response_type,
                    client_id: linkedinCredentials.client_id,
                    redirect_uri: linkedinCredentials.redirect_uri.test,
                    scope: linkedinCredentials.scope
                }
            };
            let url = axios.getUri(options)
            return res.redirect(url);
        } catch (error) {
            return errorHandler(res, error);
        }
    },

    callback: async (req, res) => {
        try {
            let options = {
                method: 'post',
                url: linkedinCredentials.access_token_url,
                params: {
                    grant_type: linkedinCredentials.grant_type,
                    code: req.query.code,
                    redirect_uri: linkedinCredentials.redirect_uri.test,
                    client_id: linkedinCredentials.client_id,
                    client_secret: linkedinCredentials.client_secret
                }
            };
            let response = await axios(options);
            return res.json(response.data);
        } catch (error) {
            let customError = new Error(error.message);
            if(error.response){
                customError.data = error.response.data
            } else {
                customError.data = error.response
            }
            return errorHandler(res, customError);
        }
    }
}